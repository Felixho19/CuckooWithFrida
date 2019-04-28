import frida, os, time
import logging
from threading import Thread, Event
from lib.cuckoo.common.constants import CUCKOO_ROOT
from lib.cuckoo.common.exceptions import CuckooFridaError
from lib.cuckoo.api.frida_extensions import run_cmd_with_timeout, exception_list, write_to_file
from lib.cuckoo.api.script import get_script
log = logging.getLogger(__name__)


class FridaManager(Thread):
    """Frida Manager.
    This class handles the js code injection with the frida-server running in the
    machines, and the message sent from the machines.
    """
    def __init__(self, ip, options):
        Thread.__init__(self)
        Thread.daemon = True
        self._ip = ip
        self._id = options['id']
        self._device = None
        self.process_on = False
        self._ready = False
        self._platform = "android_test"
        self._log_count = 0
        self._stop_flag = False
        self._event = None

    def set_adb(self):
        try:
            # run_cmd_with_timeout("adb kill-server && adb start-server", 8)
            os.system("adb start-server")
            os.system("adb connect {}".format(self._ip))
            log.debug("Connect to device ip {}".format(self._ip))
        except Exception as e:
            log.error("adb fail to connect guest machine with ip: {}".format(self._ip))
            self.unset_adb()
            raise CuckooFridaError(e)

    def unset_adb(self):
        try:
            os.system("killall adb")
            log.debug("kill adb")
        except Exception as e:
            log.error("adb fail to kill adb server")
            raise CuckooFridaError(e)

    def set_frida_server(self):
        try:
            os.system("adb shell su -c data/local/tmp/frida-server &")
            time.sleep(1)
            os.system("frida-ps -U")
            log.debug("Start Frida Server")
        except Exception as e:
            self.unset_adb()
            log.error("adb fail to start frida-server on guest machine with ip: {}. ".format(self._ip))
            raise CuckooFridaError(e)

    def set_device(self):
        try:
            # self._device = frida.get_usb_device(timeout=5)
            # log.debug(frida.enumerate_devices())
            _id = "{}:5555".format(self._ip)
            self._device = frida.get_device(_id, timeout=5)
            log.debug("Successfully run the frida thread with {}".format(self._ip))
        except Exception as e:
            self.unset_adb()
            log.error("get_usb_device failed with connected adb device: {}. ".format(self._ip))
            raise CuckooFridaError("unable to run frida-server: {}".format(e))

    def init(self):
        # self.unset_adb()
        self.set_adb()
        # comment this line if run 4.4
        self.set_frida_server()
        self.set_device()

    def wait_for_startup(self):
        while not self._ready:
            time.sleep(1)
        log.debug("Frida Startup is finished")

    def turn_off(self):
        self._stop_flag = True
        self._event.set()

    def check_frida_status(self):
        return self._stop_flag

    def run(self):
        main_dir = os.path.join(CUCKOO_ROOT, "storage", "analyses", str(self._id))
        file_dir = os.path.join(main_dir, "file")
        log_dir = os.path.join(main_dir, "logs")
        pending = []
        spawns = {}
        sessions = {}
        scripts = {}
        anti_emulator_events = {}
        self._event = Event()

        def on_child(child):
            log.debug("on_child: {}".format(child))

        def on_spawned(spawn_in):
            log.debug('on_spawned: {}'.format(spawn_in))
            if spawn_in.identifier in exception_list:
                self._device.resume(spawn_in.pid)
            else:
                pending.append(spawn_in)
                self._event.set()

        def on_removed(spawn_out):
            log.debug('on_removed: {}'.format(spawn_out))
            s = sessions.get(spawn_out.pid)
            if s:
                scr = scripts[spawn_out.pid]
                scr.unload()
                log.debug('on_removed - unload: {}'.format(spawn_out))
                s.detach()

        # respond to "send" in javascript
        # message {type:(send || error), payload: (str || list || dict)}

        def on_message(message, data):
            if message.get("type") == "send":
                payload = message.get("payload")
                # log.debug("on_message - payload: {}".format(payload))
                pid = payload.get("Process")
                if pid:
                    pid = spawns.get(pid, pid)
                t = payload.get("type")

                if t == "file":
                    # payload {"Process" : Process.id, "file" : fs.readFileSync(path), "path" : path}
                    # log.debug("on_message: {} - file - path {}".format(pid, payload.get("path")))
                    msg = payload.get("message")
                    # log.debug('on_message: {} {} {}'.format(pid, msg, data))
                    data = payload.get("file")
                    write_to_file(file_dir, payload.get("path"), data)
                    # log.debug("on_message: {} - successfully write file {}".format(pid, payload.get("path")))
                elif t == "msg":
                    # payload {"Process" : Process.id, "message" :  "{Content}"};
                    msg = payload.get("message")
                    log.debug('on_message: {} {} {}'.format(pid, msg, data))
                elif t == 'log':
                    # send({"type":"log", "Process" : Process.id, "log": fs.readFileSync(path) ,"message":msg});
                    msg = payload.get("message")
                    log.debug('on_message: {} {} {}'.format(pid, msg, data))
                    data = payload.get("log")
                    title = payload.get("title", "temp_log")
                    temp = self._log_count
                    self._log_count += 1
                    write_to_file(log_dir, "{}_{}.log".format(title, temp), data)
                elif t == 'droidmon':
                    msg = payload.get("message")
                    data = payload.get("data")
                    c = data.get('class')
                    if c and anti_emulator_events.get(c):
                        anti_emulator_events[c].append(data)
                    elif not anti_emulator_events.get(c):
                        anti_emulator_events[c] = [data]
                    log.debug('on_message: {} {} {}'.format(pid, msg, data))
                    write_to_file(log_dir, "emulatorDetect.log", data, json_enabled=True)
                elif t == 'recv_wait':  # TODO: server-side intercept
                    msg = payload.get("message")
                    data = payload.get("data")
                    # TODO: Logic handling
                    s = scripts.get(pid)
                    if s:
                        # s.post({JSON})
                        pass
                    log.debug('on_message: {} {} {}'.format(pid, msg, data))
            else:
                log.debug("{} {}".format(message, data))

        try:
            log.debug("Run")
            log.debug("Device: {}".format(self._device))
            self._device.on('spawn-added', on_spawned)
            # self._device.on('child-added', on_child)
            # self._device.on('spawn-removed', on_removed)
            self._device.enable_spawn_gating()
            log.debug("Enabled spawn gating")
            for spawn in self._device.enumerate_pending_spawn():
                self._device.resume(spawn.pid)
            self._ready = True
            while True:
                while len(pending) == 0:
                    self._event.wait()
                    if self._stop_flag:
                        raise ValueError("Task #{}: {} is terminated.".format(self._id, self._device))
                    self._event.clear()
                spawn = pending.pop()
                if spawn.identifier is not None and spawn.identifier not in exception_list:
                    log.debug('Instrumenting: {}'.format(spawn))
                    session = self._device.attach(spawn.pid)
                    # session.enable_jit()
                    # TODO: Handle subprocess
                    # session.enable_child_gating()
                    # Early instrumentation by rpc exports feature
                    script = session.create_script(get_script(self._platform))
                    script.on('message', on_message)
                    script.load()
                    script.exports.init()
                    # script.exports.debug()
                    log.debug('Instrumented: {}'.format(spawn))
                    sessions[spawn.pid] = session
                    scripts[spawn.pid] = script
                    spawns[spawn.pid] = spawn
                    try:
                        self._device.resume(spawn.pid)
                    except Exception as e:
                        if 'unable to find process with pid' in str(e):
                            pass
                        else:
                            raise CuckooFridaError(e)
                    time.sleep(1)
                    # script.exports.modules()
                else:
                    log.debug('Not instrumenting: {}'.format(spawn))
                    self._device.resume(spawn.pid)
                    time.sleep(1)
                log.debug('Processed: {}'.format(spawn))
        except ValueError as normal:
            self._device.off('spawn-added', on_spawned)
            self.unset_adb()
            log.debug(normal)
        except KeyboardInterrupt as k:
            self.unset_adb()
            frida.shutdown()
            log.debug(k)
        except Exception as e:
            self.unset_adb()
            self._stop_flag = True
            raise CuckooFridaError(e)









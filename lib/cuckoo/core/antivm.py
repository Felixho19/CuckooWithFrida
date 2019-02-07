# Copyright (C) 2010-2015 Cuckoo Foundation.
# This file is part of Cuckoo Sandbox - http://www.cuckoosandbox.org
# See the file 'docs/LICENSE' for copying permission.

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

    This class handles the js code injection with the agents running in the
    machines.
    """
    def __init__(self, ip, options):
        Thread.__init__(self)
        Thread.daemon = True
        self._ip = ip
        self._id = options['id']
        self._device = None
        self._platform = "android_test"

    def set_adb(self):
        try:
            cmd = "adb kill-server && adb start-server"
            run_cmd_with_timeout(cmd, 8)
            cmd = "adb connect {}".format(self._ip)
            run_cmd_with_timeout(cmd, 8)
            log.debug("Connect to device ip {}".format(self._ip))
        except Exception as e:
            log.error("adb fail to connect guest machine with ip: {}".format(self._ip))
            raise CuckooFridaError(e)

    def set_frida_server(self):
        try:
            cmd = "adb shell su -c data/local/tmp/frida-server &"
            os.system(cmd)
            log.debug("Start Frida Server")
        except Exception as e:
            log.error("adb fail to start frida-server on guest machine with ip: {}. ".format(self.ip))
            raise CuckooFridaError(e)

    def set_device(self):
        try:
            self._device = frida.get_usb_device(timeout=5)
        except Exception as e:
            raise CuckooFridaError("unable to run frida-server: {}".format(e))
        log.debug("Successfully run the frida thread")

    def init(self):
        self.set_adb()
        self.set_frida_server()
        self.set_device()

    def run(self):
        file_dir = os.path.join(CUCKOO_ROOT, "storage", "analyses", str(self._id), "file")
        pending = []
        spawns = {}
        sessions = {}
        scripts = {}
        event = Event()

        def on_child(child):
            log.debug("on_child: {}".format(child))

        def on_spawned(spawn_in):
            log.debug('on_spawned: {}'.format(spawn_in))
            pending.append(spawn_in)
            event.set()

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
                if payload.get("file"):
                    # payload {"Process" : Process.id, "file" : fs.readFileSync(path), "path" : path}
                    log.debug("on_message: {} - file - path {}".format(pid, payload.get("path")))
                    # log.debug("on_message - file: {}".format(payload.get("file")))
                    data = payload.get("file")
                    write_to_file(file_dir, payload.get("path"), data)
                    log.debug("on_message: {} - successfully write file {}".format(pid, payload.get("path")))
                elif payload.get("message"):
                    # payload {"Process" : Process.id, "message" :  "{Content}"};
                    msg = payload.get("message")
                    log.debug('on_message: {} {} {}'.format(pid, msg, data))

        try:
            self._device.on('spawn-added', on_spawned)
            # self._device.on('spawn-removed', on_removed)
            self._device.enable_spawn_gating()
            log.debug("Enabled spawn gating")
            # log.debug("Pending: {}".format(self._device.enumerate_pending_spawn()))
            for spawn in self._device.enumerate_pending_spawn():
                # log.debug('Resuming: {}'.format(spawn))
                self._device.resume(spawn.pid)
            while True:
                while len(pending) == 0:
                    # log.debug('Waiting for data')
                    event.wait(5)
                    try:
                        frida.get_usb_device(timeout=5)
                    except:
                        raise ValueError("Task #{}: {} is terminated.".format(self._id, self._device))
                    event.clear()
                spawn = pending.pop()
                if spawn.identifier is not None and spawn.identifier not in exception_list:
                    log.debug('Instrumenting: {}'.format(spawn))
                    session = self._device.attach(spawn.pid)
                    # session.enable_jit()
                    # session.on('child-added', on_child)
                    # session.enable_child_gating()
                    # Early instrumentation by rpc exports feature
                    script = session.create_script(get_script(self._platform))
                    script.on('message', on_message)
                    script.load()
                    script.exports.init()
                    log.debug('Instrumented: {}'.format(spawn))
                    sessions[spawn.pid] = session
                    scripts[spawn.pid] = script
                    spawns[spawn.pid] = spawn
                else:
                    log.debug('Not instrumenting: {}'.format(spawn))
                self._device.resume(spawn.pid)
                time.sleep(1)
                log.debug('Processed: {}'.format(spawn))
        except ValueError as normal:
            log.debug(normal)
        except Exception as e:
            raise CuckooFridaError(e)









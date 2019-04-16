import logging, os
from subprocess import Popen, PIPE
from threading import Timer

log = logging.getLogger(__name__)

# x86
exception_list = {
            "com.google.android.configupdater",
            "com.google.android.partnersetup",
            "com.android.gallery3d",
            "com.android.settings:superuser",
            "de.robv.android.xposed.installer",
            "com.android.defcontainer",
            "android.process.media",
            "com.svox.pico",
            "android.process.acore",
            "com.android.calendar",
            "com.android.deskclock",
            "com.android.email",
            "com.android.inputmethod.latin",
            "com.android.launcher3",
            "com.android.phone",
            "com.android.providers.calendar",
            "com.android.settings",
            "com.android.systemui",
            "com.android.vending",
            "com.cuckoo.agent",
            "com.cyanogenmod.eleven:main",
            "com.google.android.gm",
            "com.google.android.gms",
            "com.google.android.gms.persistent",
            "com.google.android.gms.ui",
            "com.google.android.gms.unstable",
            "com.google.android.googlequicksearchbox:interactor",
            "com.google.android.googlequicksearchbox:search",
            "com.google.android.partnersetup",
            "com.google.android.youtube",
            "com.google.process.gapps",
            "org.android_x86.analytics",
            "xposed_service_app",
            "xposed_logcat",
            "xposed_service_system",
            "com.android.packageinstaller",
            "com.android.vending:instant_app_installer"
}


# Helper
def run_cmd_with_timeout(cmd, timeout_sec, executable=None, wait=False):
    log.debug("Start cmd {}".format(cmd))
    if not executable:
        proc = Popen(cmd, stdout=PIPE, stderr=PIPE, shell=True)
    else:
        proc = Popen(cmd, stdout=PIPE, stderr=PIPE, shell=True, executable=executable)
    timer = Timer(timeout_sec, proc.kill)
    try:
        timer.start()
        if not wait:
            stdout, stderr = proc.communicate()
        else:
            proc.wait()
        # if stdout and len(stdout) > 0:
        #     log.debug(stdout)
        if stderr and len(stderr) > 0:
            log.debug(stderr)
    except:
        log.debug("{} cmd timeout".format(cmd))
    finally:
        timer.cancel()


def write_to_file(dir_path, file_path, file, json_enabled=False):
    filename = file_path.replace("/", "_")
    target = os.path.join(dir_path, filename)
    if not os.path.exists(dir_path):
        os.mkdir(dir_path)
    if json_enabled:
        import json
        file = json.dumps(file)
    if not os.path.exists(target):
        open(target, 'w').write("{}\n".format(file))
    else:
        open(target, 'a+').write("{}\n".format(file))


def check_ping(hostname):
    response = os.system("ping -c 1 " + hostname)
    return response == 0

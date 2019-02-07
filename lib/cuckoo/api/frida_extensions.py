import logging, os
from subprocess import Popen, PIPE
from threading import Timer

log = logging.getLogger(__name__)

# Global
exception_list = {
            "com.google.android.configupdater",
            "com.google.android.partnersetup",
            "com.android.gallery3d",
            "com.android.settings:superuser",
            "de.robv.android.xposed.installer",
            "com.android.defcontainer",
            "android.process.media",
            "com.svox.pico",
            "com.android.packageinstaller"
}


# Helper
def run_cmd_with_timeout(cmd, timeout_sec, executable=None):
    log.debug("Start cmd {}".format(cmd))
    if not executable:
        proc = Popen(cmd, stdout=PIPE, stderr=PIPE, shell=True)
    else:
        proc = Popen(cmd, stdout=PIPE, stderr=PIPE, shell=True, executable=executable)
    timer = Timer(timeout_sec, proc.kill)
    try:
        timer.start()
        stdout, stderr = proc.communicate()
        if stdout and len(stdout) > 0:
            log.debug(stdout)
        if stderr and len(stderr) > 0:
            log.debug(stderr)
    except:
        log.debug("{} cmd timeout".format(cmd))
    finally:
        timer.cancel()


def write_to_file(dir_path, file_path, file):
    filename = file_path.replace("/", "_")
    target = os.path.join(dir_path, filename)
    if not os.path.exists(dir_path):
        os.mkdir(dir_path)
    if not os.path.exists(target):
        open(target, 'w').write("{}".format(file))





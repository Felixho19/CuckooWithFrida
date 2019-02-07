import os, codecs, logging
from subprocess import Popen, PIPE
from lib.cuckoo.common.constants import CUCKOO_ROOT
from lib.cuckoo.api.frida_extensions import rpc_exports_init_parser, function_call_parser, run_cmd_with_timeout
from lib.cuckoo.core.startup import init_logging

def read_file(path):
    '''
    :param path: file path of the predefined javascript
    :return: string of javascript
    '''
    try:
        with codecs.open(path, 'r', encoding='utf8') as f:
            return f.read()
    except Exception as e:
        return ""


def read_scripts():
    path = os.path.join(CUCKOO_ROOT, "hook_scripts", "android_test")
    files = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]
    scripts = ""
    for f in files:
        script = read_file(os.path.join(path, f))
        scripts += script
        scripts += '\n'
    return scripts


log = logging.getLogger()
init_logging()
log.setLevel(logging.DEBUG)
s = function_call_parser(rpc_exports_init_parser(read_scripts()))
log.debug(s)
temp_path = os.path.join(CUCKOO_ROOT, "hook_scripts", "temp")
open(os.path.join(temp_path, "test.js"), "w").write(s)
cmd = "source ~/.nvm/nvm.sh;nvm use 8.0.0;frida-compile {} -o {}".format(
   os.path.join(temp_path, "test.js"), os.path.join(temp_path, "result.js"))
run_cmd_with_timeout(cmd, 10, executable="/bin/bash")
log.debug('Done')

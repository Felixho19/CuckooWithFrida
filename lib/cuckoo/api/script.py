import os, logging, codecs
from lib.cuckoo.common.constants import CUCKOO_ROOT
from lib.cuckoo.api.frida_extensions import run_cmd_with_timeout
from lib.cuckoo.core.startup import init_logging

if __name__ == "__main__":
    log = logging.getLogger()
    init_logging()
    log.setLevel(logging.DEBUG)
else:
    log = logging.getLogger(__name__)


def function_call_parser(script):
    return """
    'use strict';
    const fs = require('frida-fs');
    (function (){
    %s 
    }).call(this);
    """ % script


def rpc_exports_init_parser(script):
    return """
    rpc.exports = {
        init : function () {
        Java.perform(function() {
        %s 
        });
    }};
    """ % script


def read_file(path):
    '''
    :param path: file path of the predefined javascript
    :return: string of javascript
    '''
    try:
        with codecs.open(path, 'r', encoding='utf8') as f:
            return f.read()
    except Exception as e:
        log.error(e)
        return ""


def read_scripts(component, platform):
    path = os.path.join(CUCKOO_ROOT, "hook_scripts", component, platform)
    files = [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]
    scripts = ""
    for f in files:
        script = read_file(os.path.join(path, f))
        scripts += script
    return scripts


def frida_compile(scripts):
    dir_path = os.path.join(CUCKOO_ROOT, "hook_scripts", "temp")
    input_file = os.path.join(dir_path, "input.js")
    output_file = os.path.join(dir_path, "compiled.js")
    with open(input_file, 'w') as f:
        f.write(scripts)
        f.close()
    # cmd = "source ~/.nvm/nvm.sh;nvm use 8.0.0;frida-compile {} -o {}".format(f.name, output)
    cmd = "source ~/.nvm/nvm.sh;nvm use 8.0.0;npm run prepare"
    run_cmd_with_timeout(cmd, 20)
    result = read_file(output_file)
    return result


def get_script(platform):
    script = ""
    javascript_list = ['constant', 'ulits', 'scripts']
    for javascript in javascript_list:
        script += read_scripts(javascript, platform)
    script = function_call_parser(rpc_exports_init_parser(script))
    script = frida_compile(script)
    return script
    # return read_file(os.path.join(CUCKOO_ROOT, "hook_scripts", "temp", "compiled.js"))


s = get_script("android_test")
print(s)
#dir_path = os.path.join(CUCKOO_ROOT, "hook_scripts", "temp")
#output = os.path.join(dir_path, "test.js")
#open(output, 'w').write(s)


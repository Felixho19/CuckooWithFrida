import os, logging, codecs
from lib.cuckoo.common.constants import CUCKOO_ROOT
from lib.cuckoo.api.frida_extensions import run_cmd_with_timeout

log = logging.getLogger(__name__)


def required_package_parser():
    script = ""
    #required_package = [('fs', 'frida-fs')]
    #require_format = "const {0} = require('{1}');\n"
    #for (const, package) in required_package:
    #    script += require_format.format(const, package)
    return script


def function_call_parser(script):
    return """
    'use strict';{0}(function (){{ {1} }}).call(this);
    """.format(required_package_parser(), script)


def api_parser(name, script):
    return ''' 
    {0} : function () {{Java.perform(function() {{ {1} }});}}
    '''.format(name, script)


def api_debug_parser():
    return ''' 
    debug : function() {
        function send_msg(msg){send({"type":"msg", "Process" : Process.id, "message" :  msg});};
        send_msg("Frida Server Version : "+Frida.version);
        send_msg("Frida Heap Size : "+Frida.heapSize);
        Process.enumerateModulesSync().forEach(function (m) {
            send_msg(m.name);
        });
    }
    '''


def api_modules_parser():
    return '''
    modules : function() {
        function send_log(log_content, msg){
        send({"type":"log", "Process" : Process.id, "log": log_content , "title" : "list_modules", "message":msg});
        };
        var log_c = "";
        Module.enumerateExportsSync("libc.so").forEach(function (l) {
            log_c += JSON.stringify(l, null, ' ') + '\\n';
        });
        send_log(log_c, "sending lib_modules contents");
    }
    '''


def rpc_exports_parser(apis):
    return """
    rpc.exports = {{ {0} }};
    """.format(apis)


def read_file(path):
    try:
        with codecs.open(path, 'r', encoding='utf8') as f:
            return f.read()
    except Exception as e:
        log.error(e)
        return ""


def read_scripts(api, component, platform):
    path = os.path.join(CUCKOO_ROOT, "hook_scripts", api, component, platform)
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
    cmd = "source ~/.nvm/nvm.sh;nvm use 8.0.0;npm run build"
    run_cmd_with_timeout(cmd, 20)
    result = read_file(output_file)
    return result


def get_script(platform):
    script = ""
    exports_api_list = ['init']
    script_dict = {}
    scripts = []
    for api in exports_api_list:
        script_dict[api] = ['scripts']
    for (k, dirs) in script_dict.iteritems():
        for d in dirs:
            script += read_scripts(k, d, platform)
        script = api_parser(k, script)
        scripts.append(script)
    scripts.append(api_debug_parser())
    scripts.append(api_modules_parser())
    apis = ",\n".join(map(str, scripts))
    script = function_call_parser(rpc_exports_parser(apis))
    # script = frida_compile(script)
    return script


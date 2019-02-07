var IOBridge = Java.use('libcore.io.IoBridge');
IOBridge.open.implementation = function(path, flags) {
    if (Process.id > 10000 && Process.id < 99999) {
        if (path == "/system/build.prop"){
            var new_path = "/data/local/tmp/fake-build.prop";
            return this.open.call(this, new_path, flags);
        }
        if (path == "/proc/tty/drivers"){
            var new_path = "/data/local/tmp/fake-drivers";
            return this.open.call(this, new_path, flags);
        }
    }
    return this.open.call(this, path, flags);
};
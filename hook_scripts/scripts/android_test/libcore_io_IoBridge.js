//Anti-emulator detection && Logger
var IOBridge = Java.use('libcore.io.IoBridge');
IOBridge.open.implementation = function(path, flags) {
    var Binder = Java.use("android.os.Binder");
    var uid = Binder.getCallingUid();
    send_msg("Try to open :" + path + "with uid : "+uid);
    if (uid > 10000 && uid < 99999) {
        if (path == "/system/build.prop") {
            send_msg("Bypass IoBridge.open check " + path);
            var new_path = "/data/local/tmp/fake-build.prop";
            return this.open.call(this, new_path, flags);
        }
        if (path == "/proc/tty/drivers") {
            send_msg("Bypass IoBridge.open check " + path);
            var new_path = "/data/local/tmp/fake-drivers";
            return this.open.call(this, new_path, flags);
        }
        if (path == "/proc/cpuinfo") {
            send_msg("Bypass IoBridge.open check " + path);
            var new_path = "/data/local/tmp/fake-cpuinfo";
            return this.open.call(this, new_path, flags);
        }
    }
    return this.open.call(this, path, flags);
};
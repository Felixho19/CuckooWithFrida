//Anti-emulator detection
var SystemProperties = Java.use('android.os.SystemProperties');
SystemProperties.get.overload('java.lang.String').implementation = function (key) {
    if (key in build_prop) {
        send_msg("Bypass SystemProperties check");
        return build_prop[key];
    }
    return this.get.call(this, key);
};
//Anti-emulator detection
var ActivityManager = Java.use("android.app.ActivityManager");
ActivityManager.isUserAMonkey.implementation = function () {
    send_msg("Bypass isUserAMonkey");
    return false;
};
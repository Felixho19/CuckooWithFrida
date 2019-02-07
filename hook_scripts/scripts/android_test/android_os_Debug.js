//Anti-emulator detection
var Debug = Java.use("android.os.Debug");
Debug.isDebuggerConnected.implementation = function () {
    send_msg("Bypass isDebuggerConnected");
    return false;
};
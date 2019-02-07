var Debug = Java.use("android.os.Debug");
Debug.isDebuggerConnected.implementation = function () {
    send("Bypass isDebuggerConnected");
    return false;
};
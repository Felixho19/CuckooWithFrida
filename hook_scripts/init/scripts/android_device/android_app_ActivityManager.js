var ActivityManager = Java.use("android.app.ActivityManager");

ActivityManager.isUserAMonkey.implementation = function () {
    send("Bypass isUserAMonkey");
    return false;
};
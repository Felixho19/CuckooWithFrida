var TelephonyManager = Java.use("android.telephony.TelephonyManager");

TelephonyManager.getDeviceId.overload().implementation = function () {
    send("Bypass getDeviceId");
    return "098767899076561";
};

TelephonyManager.getLine1Number.implementation = function () {
    send("Bypass getLine1Number");
    return "15802920458";
};

TelephonyManager.getNetworkOperatorName.implementation = function () {
    send("Bypass getNetworkOperatorName");
    return "CMCC";
};

TelephonyManager.getSimSerialNumber.implementation = function () {
    send("Bypass getSimSerialNumber");
    return "89014103211118510799";
};
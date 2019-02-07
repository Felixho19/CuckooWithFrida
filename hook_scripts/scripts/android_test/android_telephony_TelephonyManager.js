//Anti-emulator detection
var TelephonyManager = Java.use("android.telephony.TelephonyManager");
TelephonyManager.getDeviceId.overload().implementation = function () {
    send_msg("Bypass getDeviceId");
    return "098767899076561";
};
TelephonyManager.getLine1Number.implementation = function () {
    send_msg("Bypass getLine1Number");
    return "15802920458";
};
TelephonyManager.getNetworkOperatorName.overload().implementation = function () {
    send_msg("Bypass getNetworkOperatorName");
    return "CMCC";
};
TelephonyManager.getSimSerialNumber.overload().implementation = function () {
    send_msg("Bypass getSimSerialNumber");
    return "89014103211118510799";
};
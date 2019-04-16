var wifiInfo = Java.use("android.net.wifi.WifiInfo");
wifiInfo.getMacAddress.implementation = function () {
    return "00:26:37:17:3C:71";
};
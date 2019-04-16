var NetworkInterface = Java.use("java.net.NetworkInterface");
NetworkInterface.getName.implementation = function () {
    if (this.getName.call(this) == "eth0"){
        return "wan0";
    }
    return this.getName.call(this);
};
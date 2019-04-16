var RootBinaries = [
    "su",
    "busybox",
    "supersu",
    "Superuser.apk",
    "KingoUser.apk",
    "SuperSu.apk"
];

var File = Java.use('java.io.File');

File.exists.implementation = function() {
    var name = File.getName.call(this);
    var shouldFakeReturn = (RootBinaries.indexOf(name) > -1)
    if (shouldFakeReturn) {
        send("Bypass return value for binary: " + name);
        return false;
    } else {
        return this.exists.call(this);
    }
};
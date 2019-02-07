//Anti-emulator detection
var FileIO = Java.use('java.io.File');
FileIO.exists.implementation = function() {
    var name = File.getName.call(this);
    var shouldFakeReturn = (RootBinaries.indexOf(name) > -1)
    if (shouldFakeReturn) {
        send_msg("Bypass return value for binary: " + name);
        return false;
    } else {
        return this.exists.call(this);
    }
};
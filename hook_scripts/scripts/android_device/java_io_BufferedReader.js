var BufferedReader = Java.use('java.io.BufferedReader');

BufferedReader.readLine.implementation = function() {
    var text = this.readLine.call(this);
    if (text === null) {
        // just pass , i know it's ugly as hell but test != null won't work :(
    } else {
        var shouldFakeRead = (text.indexOf("ro.build.tags=test-keys") > -1);
        if (shouldFakeRead) {
            send("Bypass build.prop file read");
            text = text.replace("ro.build.tags=test-keys", "ro.build.tags=release-keys");
        }
    }
    return text;
};
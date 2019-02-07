//Anti-emulator detection
var boolean_map = {"test-keys": false, "unknown": false};
var String = Java.use('java.lang.String');
String.contains.implementation = function(name) {
    if (name in boolean_map) {
        if (this.contains.call(this, name)){
            var msg = {"Process" : Process.id, "message" : "Bypass contains check"};
            send(msg);
            return boolean_map[name];
        }
    }
    return this.contains.call(this, name);
};
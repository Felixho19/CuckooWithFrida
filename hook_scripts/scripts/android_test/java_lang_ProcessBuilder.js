//Anti-emulator detection
var ProcessBuilder = Java.use('java.lang.ProcessBuilder');
var executeCommand = ProcessBuilder.command.overload('java.util.List');
ProcessBuilder.start.implementation = function() {
    var cmd = this.command.call(this);
    var shouldModifyCommand = false;
    for (var i = 0; i < cmd.size(); i = i + 1) {
        var tmp_cmd = cmd.get(i).toString();
        if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd.indexOf("mount") != -1 || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd.indexOf("id") != -1) {
            shouldModifyCommand = true;
        }
    }
    if (shouldModifyCommand) {
        send_msg("Bypass ProcessBuilder " + cmd);
        this.command.call(this, ["grep"]);
        return this.start.call(this);
    }
    if (cmd.indexOf("su") != -1) {
        send_msg("Bypass ProcessBuilder " + cmd);
        this.command.call(this, ["justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled"]);
        return this.start.call(this);
    }
    return this.start.call(this);
};
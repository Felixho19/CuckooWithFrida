var Runtime = Java.use('java.lang.Runtime');

var exec = Runtime.exec.overload('[Ljava.lang.String;')
var exec1 = Runtime.exec.overload('java.lang.String')
var exec2 = Runtime.exec.overload('java.lang.String', '[Ljava.lang.String;')
var exec3 = Runtime.exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;')
var exec4 = Runtime.exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;', 'java.io.File')
var exec5 = Runtime.exec.overload('java.lang.String', '[Ljava.lang.String;', 'java.io.File')

exec.implementation = function(cmd) {
    for (var i = 0; i < cmd.length; i = i + 1) {
        var tmp_cmd = cmd[i];
        if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd == "mount" || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd == "id" || tmp_cmd == "sh") {
            var fakeCmd = "grep";
            send("Bypass " + cmd + " command");
            return exec1.call(this, fakeCmd);
        }

        if (tmp_cmd == "su") {
            var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
            send("Bypass " + cmd + " command");
            return exec1.call(this, fakeCmd);
        }
    }

    return exec.call(this, cmd);
};

exec1.implementation = function(cmd) {
    if (cmd.indexOf("getprop") != -1 || cmd == "mount" || cmd.indexOf("build.prop") != -1 || cmd == "id" || cmd == "sh") {
        var fakeCmd = "grep";
        send("Bypass " + cmd + " command");
        return exec1.call(this, fakeCmd);
    }
    if (cmd == "su") {
        var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
        send("Bypass " + cmd + " command");
        return exec1.call(this, fakeCmd);
    }
    return exec1.call(this, cmd);
};

exec2.implementation = function(cmd, env) {
    if (cmd.indexOf("getprop") != -1 || cmd == "mount" || cmd.indexOf("build.prop") != -1 || cmd == "id" || cmd == "sh") {
        var fakeCmd = "grep";
        send("Bypass " + cmd + " command");
        return exec1.call(this, fakeCmd);
    }
    if (cmd == "su") {
        var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
        send("Bypass " + cmd + " command");
        return exec1.call(this, fakeCmd);
    }
    return exec2.call(this, cmd, env);
};

exec3.implementation = function(cmdarr, envp) {
    for (var i = 0; i < cmdarr.length; i = i + 1) {
        var tmp_cmd = cmdarr[i];
        if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd == "mount" || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd == "id" || tmp_cmd == "sh") {
            var fakeCmd = "grep";
            send("Bypass " + cmdarr + " command");
            return exec1.call(this, fakeCmd);
        }

        if (tmp_cmd == "su") {
            var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
            send("Bypass " + cmdarr + " command");
            return exec1.call(this, fakeCmd);
        }
    }
    return exec3.call(this, cmdarr, envp);
};

exec4.implementation = function(cmdarr, env, file) {
    for (var i = 0; i < cmdarr.length; i = i + 1) {
        var tmp_cmd = cmdarr[i];
        if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd == "mount" || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd == "id" || tmp_cmd == "sh") {
            var fakeCmd = "grep";
            send("Bypass " + cmdarr + " command");
            return exec1.call(this, fakeCmd);
        }

        if (tmp_cmd == "su") {
            var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
            send("Bypass " + cmdarr + " command");
            return exec1.call(this, fakeCmd);
        }
    }
    return exec4.call(this, cmdarr, env, file);
};

exec5.implementation = function(cmd, env, dir) {
    if (cmd.indexOf("getprop") != -1 || cmd == "mount" || cmd.indexOf("build.prop") != -1 || cmd == "id" || cmd == "sh") {
        var fakeCmd = "grep";
        send("Bypass " + cmd + " command");
        return exec1.call(this, fakeCmd);
    }
    if (cmd == "su") {
        var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
        send("Bypass " + cmd + " command");
        return exec1.call(this, fakeCmd);
    }
    return exec5.call(this, cmd, env, dir);
};
var ProcessManager = Java.use("java.lang.ProcessManager");
var ProcessImpl = Java.use("java.lang.ProcessManager$ProcessImpl");
var InputStream = Java.use("java.io.InputStream");
ProcessImpl.getInputStream.implementation = function () {
    var Binder = Java.use("android.os.Binder");
    var uid = Binder.getCallingUid();
    if (uid > 10000 && uid < 99999) {
        if (this.getInputStream.call(this) === InputStream.$new("/system/build.prop")) {
            return InputStream.$new("/data/local/tmp/fake-build.prop");
        }
        return this.getInputStream.call(this);
    }
};
var ProcManExec = ProcessManager.exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;', 'java.io.File', 'boolean');
var ProcManExecVariant = ProcessManager.exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;', 'java.lang.String', 'java.io.FileDescriptor', 'java.io.FileDescriptor', 'java.io.FileDescriptor', 'boolean');
ProcManExec.implementation = function(cmd, env, workdir, redirectstderr) {
    var fake_cmd = cmd;
    for (var i = 0; i < cmd.length; i = i + 1) {
        var tmp_cmd = cmd[i];
        if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd == "mount" || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd == "id") {
            var fake_cmd = ["grep"];
            send("Bypass " + cmdarr + " command");
        }

        if (tmp_cmd == "su") {
            var fake_cmd = ["justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled"];
            send("Bypass " + cmdarr + " command");
        }
    }
    return ProcManExec.call(this, fake_cmd, env, workdir, redirectstderr);
};
ProcManExecVariant.implementation = function(cmd, env, directory, stdin, stdout, stderr, redirect) {
    var fake_cmd = cmd;
    for (var i = 0; i < cmd.length; i = i + 1) {
        var tmp_cmd = cmd[i];
        if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd == "mount" || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd == "id") {
            var fake_cmd = ["grep"];
            send("Bypass " + cmdarr + " command");
        }

        if (tmp_cmd == "su") {
            var fake_cmd = ["justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled"];
            send("Bypass " + cmdarr + " command");
        }
    }
    return ProcManExecVariant.call(this, fake_cmd, env, directory, stdin, stdout, stderr, redirect);
};
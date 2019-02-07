//Anti-emulator detection
Interceptor.attach(Module.findExportByName("libc.so", "__system_property_get"), {
    onEnter: function(args) {
        var prop = Memory.readCString(args[0]);
        var v = Memory.readCString(args[1]);
        if (prop in build_prop) {
            send_msg("__system_property_get : ("+prop+":"+v+")");
            Memory.writeUtf8String(args[1], build_prop[prop]);
        }
    },
    onLeave: function(retval) {

    }
});

Interceptor.attach(Module.findExportByName("libc.so", "system"), {
    onEnter: function(args) {
        var cmd = Memory.readCString(args[0]);
        send_msg("SYSTEM CMD: " + cmd);
        if (cmd.indexOf("getprop") != -1 || cmd == "mount" || cmd.indexOf("build.prop") != -1 || cmd == "id") {
            send_msg("Bypass native system: " + cmd);
            Memory.writeUtf8String(args[0], "grep");
        }
        if (cmd == "su") {
            send_msg("Bypass native system: " + cmd);
            Memory.writeUtf8String(args[0], "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled");
        }
    },
    onLeave: function(retval) {

    }
});

Interceptor.attach(Module.findExportByName("libc.so", "fopen"), {
    onEnter: function(args) {
        var path = Memory.readCString(args[0]);
        path = path.split("/");
        var executable = path[path.length - 1];
        var shouldFakeReturn = (RootBinaries.indexOf(executable) > -1)
        if (shouldFakeReturn) {
            Memory.writeUtf8String(args[0], "/notexists");
            send_msg("Bypass native fopen");
        }
    },
    onLeave: function(retval) {

    }
});
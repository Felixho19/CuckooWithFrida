function send_msg(msg) {
    send({"Process" : Process.id, "message" :  msg});
};

function send_file(path, msg) {
    send({"Process" : Process.id, "file" : fs.readFileSync(path), "path" : path, "message" : msg});
};

function checking() {
    send_msg(Frida.version);
    send_msg(Frida.heapSize);
    Process.enumerateModulesSync().forEach(function (m) {
        send_msg(JSON.stringify(m, null, ' '));
    });
};


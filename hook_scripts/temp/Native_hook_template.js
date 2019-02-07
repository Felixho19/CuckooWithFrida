Interceptor.attach(Module.findExportByName("{Library_so_filename}", "{method_name}"), {
    onEnter: function(args) {
        {onEnter_details}
    },
    onLeave: function(retval) {
        {onLeave_details}
    }
});
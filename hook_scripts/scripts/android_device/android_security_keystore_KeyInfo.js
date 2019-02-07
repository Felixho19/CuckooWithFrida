var KeyInfo = Java.use('android.security.keystore.KeyInfo');
KeyInfo.isInsideSecureHardware.implementation = function() {
        send("Bypass isInsideSecureHardware");
        return true;
};


    'use strict';
    const fs = require('frida-fs');
    (function (){
    
    rpc.exports = {
        init : function () {
        Java.perform(function() {
        const build_prop = {
    "ro.build.id": "KTU84P",
    "ro.build.display.id": "KTU84P",
    "ro.build.version.incremental": "1227136",
    "ro.build.version.sdk": "19",
    "ro.build.version.codename": "REL",
    "ro.build.version.release": "6.0.1",
    "ro.build.date": "Fri Jun 13 07:05:49 UTC 2014",
    "ro.build.date.utc": "1402643149",
    "ro.build.type": "user",
    "ro.build.user": "android-build",
    "ro.build.host": "kpfj3.cbf.corp.google.com",
    "ro.build.tags": "release-keys",
    "ro.product.model": "Nexus 5",
    "ro.product.brand": "google",
    "ro.product.name": "hammerhead",
    "ro.product.device": "hammerhead",
    "ro.product.board": "hammerhead",
    "ro.product.cpu.abi": "armeabi-v7a",
    "ro.product.cpu.abi2": "armeabi",
    "ro.product.manufacturer": "LGE",
    "ro.product.locale.language": "en",
    "ro.product.locale.region": "US",
    "ro.wifi.channels": "",
    "ro.board.platform": "msm8974",
    "ro.build.product": "hammerhead",
    "ro.build.description": "hammerhead-user 4.4.4 KTU84P 1227136 release-keys",
    "ro.build.fingerprint": "google/hammerhead/hammerhead:4.4.4/KTU84P/1227136:user/release-keys",
    "ro.build.characteristics": "nosdcard",
    "ro.config.ringtone": "Titania.ogg",
    "ro.config.notification_sound": "Tethys.ogg",
    "ro.config.alarm_alert": "Oxygen.ogg",
    "ro.com.android.dateformat": "MM-dd-yyyy",
    "ro.com.android.dataroaming": "false",
    "ro.url.legal": "http://www.google.com/intl/%s/mobile/android/basic/phone-legal.html",
    "ro.url.legal.android_privacy": "http://www.google.com/intl/%s/mobile/android/basic/privacy.html",
    "ro.com.google.clientidbase": "android-google",
    "ro.carrier": "unknown",
    "ro.com.android.wifi-watchlist": "GoogleGuest",
    "ro.error.receiver.system.apps": "com.google.android.gms",
    "ro.setupwizard.enterprise_mode": "1",
    "ro.opengles.version": "196608",
    "ro.sf.lcd_density": "480",
    "persist.hwc.mdpcomp.enable": "true",
    "ro.hwui.texture_cache_size": "72",
    "ro.hwui.layer_cache_size": "48",
    "ro.hwui.r_buffer_cache_size": "8",
    "ro.hwui.path_cache_size": "32",
    "ro.hwui.gradient_cache_size": "1",
    "ro.hwui.drop_shadow_cache_size": "6",
    "ro.hwui.texture_cache_flushrate": "0.4",
    "ro.hwui.text_small_cache_width": "1024",
    "ro.hwui.text_small_cache_height": "1024",
    "ro.hwui.text_large_cache_width": "2048",
    "ro.hwui.text_large_cache_height": "1024",
    "drm.service.enabled": "true",
    "ro.qc.sensors.max_geomag_rotvec": "60",
    "ro.qc.sensors.max_gyro_rate": "200",
    "ro.qc.sensors.max_accel_rate": "200",
    "ro.qc.sensors.max_grav": "200",
    "ro.qc.sensors.max_rotvec": "200",
    "ro.qc.sensors.max_ortn": "200",
    "ro.qc.sensors.max_linacc": "200",
    "ro.qc.sensors.max_gamerv_rate": "200",
    "ro.qualcomm.sensors.smd": "true",
    "ro.qualcomm.sensors.game_rv": "true",
    "ro.qualcomm.sensors.georv": "true",
    "ro.qc.sensors.smgr_mag_cal_en": "true",
    "ro.qc.sensors.step_detector": "true",
    "ro.qc.sensors.step_counter": "true",
    "debug.qualcomm.sns.hal": "w",
    "debug.qualcomm.sns.daemon": "w",
    "debug.qualcomm.sns.libsensor1": "w",
    "ro.telephony.call_ring.multiple": "0",
    "wifi.interface": "wlan0",
    "wifi.supplicant_scan_interval": "15",
    "media.aac_51_output_enabled": "true",
    "persist.radio.apm_sim_not_pwdn": "1",
    "ro.telephony.default_network": "10",
    "telephony.lteOnCdmaDevice": "1",
    "persist.radio.mode_pref_nv10": "1",
    "persist.audio.handset.mic.type": "digital",
    "persist.audio.dualmic.config": "endfire",
    "persist.audio.fluence.voicecall": "true",
    "persist.audio.fluence.voicerec": "false",
    "persist.audio.fluence.speaker": "false",
    "af.resampler.quality": "4",
    "persist.radio.custom_ecc": "1",
    "persist.radio.always_send_plmn": "true",
    "ro.input.noresample": "1",
    "dalvik.vm.heapstartsize": "8m",
    "dalvik.vm.heapgrowthlimit": "192m",
    "dalvik.vm.heapsize": "512m",
    "dalvik.vm.heaptargetutilization": "0.75",
    "dalvik.vm.heapminfree": "512k",
    "dalvik.vm.heapmaxfree": "8m",
    "keyguard.no_require_sim": "true",
    "ro.facelock.black_timeout": "400",
    "ro.facelock.det_timeout": "1500",
    "ro.facelock.rec_timeout": "2500",
    "ro.facelock.lively_timeout": "2500",
    "ro.facelock.est_max_time": "600",
    "ro.facelock.use_intro_anim": "false",
    "persist.sys.dalvik.vm.lib": "libdvm.so",
    "net.bt.name": "Android",
    "dalvik.vm.stack-trace-file": "/data/anr/traces.txt"
};

const RootBinaries = [
    "su",
    "busybox",
    "supersu",
    "Superuser.apk",
    "SuperSu.apk",
    "x86.prop",
    "ueventd.android_x86.rc",
    "ueventd.ttVM_x86.rc",
    "ueventd.vbox86.rc",
    "init.ttVM_x86.rc",
    "init.vbox86.rc",
    "fstab.ttVM_x86",
    "fstab.vbox86"
];function send_msg(msg) {
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

//Anti-emulator detection
var Debug = Java.use("android.os.Debug");
Debug.isDebuggerConnected.implementation = function () {
    send_msg("Bypass isDebuggerConnected");
    return false;
};//Anti-emulator detection
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
});//Logger
var DexFile = Java.use("dalvik.system.DexFile");// This constructor was deprecated in API level 26.
DexFile.loadDex.implementation = function (sourcePathName, outputPathName, flags) {//loadDex(String sourcePathName, String outputPathName, int flags)
    send_file(sourcePathName, "Dynamic loading dex file to : "+outputPathName);
    return this.loadDex.call(this, sourcePathName, outputPathName, flags);
};
DexFile.loadClass.implementation = function (name,  loader) {//	loadClass(String name, ClassLoader loader)
    send_msg("Dynamic loading for class : "+name);
    return this.loadClass.call(this, name, loader);
};//Anti-emulator detection
var TelephonyManager = Java.use("android.telephony.TelephonyManager");
TelephonyManager.getDeviceId.overload().implementation = function () {
    send_msg("Bypass getDeviceId");
    return "098767899076561";
};
TelephonyManager.getLine1Number.implementation = function () {
    send_msg("Bypass getLine1Number");
    return "15802920458";
};
TelephonyManager.getNetworkOperatorName.overload().implementation = function () {
    send_msg("Bypass getNetworkOperatorName");
    return "CMCC";
};
TelephonyManager.getSimSerialNumber.overload().implementation = function () {
    send_msg("Bypass getSimSerialNumber");
    return "89014103211118510799";
};//Anti-emulator detection
var ActivityManager = Java.use("android.app.ActivityManager");
ActivityManager.isUserAMonkey.implementation = function () {
    send_msg("Bypass isUserAMonkey");
    return false;
};//Anti-emulator detection
var NetworkInterface = Java.use("java.net.NetworkInterface");
NetworkInterface.getName.implementation = function () {
    if (this.getName.call(this) == "eth0"){
        return "wan0";
    }
    return this.getName.call(this);
};//Anti-emulator detection
var SystemProperties = Java.use('android.os.SystemProperties');
SystemProperties.get.overload('java.lang.String').implementation = function (key) {
    if (key in build_prop) {
        send_msg("Bypass SystemProperties check");
        return build_prop[key];
    }
    return this.get.call(this, key);
};//Anti-emulator detection
var wifiInfo = Java.use("android.net.wifi.WifiInfo");
wifiInfo.getMacAddress.implementation = function () {
    return "00:26:37:17:3C:71";
};//Anti-emulator detection && Logger
var IOBridge = Java.use('libcore.io.IoBridge');
IOBridge.open.implementation = function(path, flags) {
    var Binder = Java.use("android.os.Binder");
    var uid = Binder.getCallingUid();
    send_msg("Try to open :" + path + "with uid : "+uid);
    if (uid > 10000 && uid < 99999) {
        if (path == "/system/build.prop") {
            send_msg("Bypass IoBridge.open check " + path);
            var new_path = "/data/local/tmp/fake-build.prop";
            return this.open.call(this, new_path, flags);
        }
        if (path == "/proc/tty/drivers") {
            send_msg("Bypass IoBridge.open check " + path);
            var new_path = "/data/local/tmp/fake-drivers";
            return this.open.call(this, new_path, flags);
        }
        if (path == "/proc/cpuinfo") {
            send_msg("Bypass IoBridge.open check " + path);
            var new_path = "/data/local/tmp/fake-cpuinfo";
            return this.open.call(this, new_path, flags);
        }
    }
    return this.open.call(this, path, flags);
};//Anti-emulator detection
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
};//Anti-emulator detection
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
        });
    }};
     
    }).call(this);
    
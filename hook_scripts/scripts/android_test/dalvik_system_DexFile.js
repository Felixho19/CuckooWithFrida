//Logger
var DexFile = Java.use("dalvik.system.DexFile");// This constructor was deprecated in API level 26.
DexFile.loadDex.implementation = function (sourcePathName, outputPathName, flags) {//loadDex(String sourcePathName, String outputPathName, int flags)
    send_file(sourcePathName, "Dynamic loading dex file to : "+outputPathName);
    return this.loadDex.call(this, sourcePathName, outputPathName, flags);
};
DexFile.loadClass.implementation = function (name,  loader) {//	loadClass(String name, ClassLoader loader)
    send_msg("Dynamic loading for class : "+name);
    return this.loadClass.call(this, name, loader);
};
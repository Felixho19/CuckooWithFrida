# Frida anit-emulator detection module for Android
Using Frida to bypass emulator detection when you use Cuckoodroid to test Android application!

## Notice: 
- Suppose to use with Cuckoodroid, as I attempt to make all the stuff to become automated.
- This project is experimental purpose, focusing on how to bypass emulator detection only. 
- Self-reference only. Please do not use in criminal purpose.
- For further details about Cuckoodroid, please go to [the original repo](https://github.com/idanr1986/cuckoo-droid).
- Feel free to suggest more possible emulator detection methods.

### Project status:
- [X] Run on Android X86 Virtual Box Image
- [ ] Run on Android ARM emulator
- [ ] Run on Android ARM emulator in Guest Machine
- [X] Bypass emulator detection

#### System properties check
    The most frequent approach which can check the running device is emulator or not effectively.
    To solve this type of checking:
      [X] Prepare a hashmap of valid system property values, which should occur in real devices.
      [X] Hook relevent methods in:
        [X] android.os.Build (Current approach changes the Build's values when the Frida script is loaded)
        [X] android.os.SystemProperties (Check key and map to valid value given by the hashmap)
        [X] libc.so -> `__system_property_get` (Check key and map to valid value given by the hashmap)
        [X] java.io.BufferedReader ([!] This stage only bypass test-keys check)
        [X] libcore.io.IoBridge, java.lang.ProcessManager$ProcessImpl, java.io.FileInputStream (Bypass check `/system/build.prop`)
        [X] libc.so -> `fopen` (Bypass check `/system/build.prop`)
        [X] java.net.NetworkInterface, android.net.wifi.WifiInfo (Bypass network checking)
      [ ] Allow ping command (Actually this kind of detection only works to internal network's emulators... Providing the Internet Access to VMs should solve the problem, but that will be another problem as you have to learn how to build Android emulator...)
        
 #### TelephonyManager check
    If you are using emulators, you will find that emulators usually do not have the sim card information. 
    In this case, if the malware samples check for TelephonyManager properties in the emulator, 
    they will know.
    * To solve this type of checking:
    [X] Hook the series of methods available in android.telephony.TelephonyManager
    
 #### Root check
    Normally, if you are using a rooted device, you might not a normal person. Basic on this guess,
    root detection is also useful to check emulator.
    * To solve this type of checking:
    [X] android.os.Debug (Do not let the app knows you are connecting to debugger)
      (For Android X86 Virtual Box Image, make sure the frida-server is running after restoring the snapshot, 
      and collect to it remotely. If you do so, this check is supposed not affecting you) 
    [X] java.io.File (Bypass the check for root application like xposed installer)
    [X] android.app.ApplicationPackageManager (Bypass the check for root application like xposed installer)
    [X] java.lang.ProcessManager (Bypass root binary like su, busybox, etc.)
    [X] libc.so -> `system` (Bypass root binary like su, busybox, etc.)
    [X] libc.so -> `fopen` (Bypass root binary like su, busybox, etc.)
      
  #### Monkey check
    Only use monkey when you want to generate random touch event. If the device is running mockey, 
    it will never be a device using by normal user.
    * To solve this type of checking:
    [X] bypass android.app.ActivityManager.isUserMonkey()
    
  #### Delayed execution in malware
    The idea of delayed execution is triggering the malicious code by some specific moment or event. 
    If those specific moment or event has not occurred, the malicious code will not run and then the analysis will fail.
    * To solve this type of checking:
    [ ] android.os.handler.postDelayed (The idea is setting a time limit to delayed code. Not sure the correctness)
    [ ] java.util.Timer, java.util.TimerTask (The idea is setting a time limit to delayed code)
    [ ] If it is waiting for attacker server to give command in order to continue... no idea how to automate the judgement.
 
  #### Hardware detection
    Testing the existance of some hardware/sensor that the emulators do not have, such as BlueTooth, Camera.
    [ ] Camera
    [ ] BlueTooth
    [ ] More... The possible combination of checking ways is too much...
 

  




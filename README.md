# Frida anit-emulator detection module for Android
Using Frida to bypass emulator detection when you use Cuckoodroid to test Android application!

## Notice: 
- Suppose to use with Cuckoodroid, as I attempt to make all the stuff to become automated.
- This project is experimental purpose, focusing on how to bypass emulator detection. 
- Self-reference only. Please do not use in criminal purpose.
- For further details about Cuckoodroid, please go to [the original repo](https://github.com/idanr1986/cuckoo-droid).
- Feel free to suggest more possible emulator detection methods.

### Project status:
- [X] Run in Android X86 VM
- [X] Bypass emulator detection:
  - 1. System properties check
    The most frequent approach which can check the running device is emulator or not effectively.
    To solve this type of checking:
      - [X] Prepare a hashmap of valid system property values, which should occur in real devices.
      - [X] Hook relevent methods:
        - [?] android.os.Build (Current approach changes the Build's values when the Frida script is loaded)
        - [X] android.os.SystemProperties (Check key and map to valid value given by the hashmap)
        - [X] libc.so -> `__system_property_get` (Check key and map to valid value given by the hashmap)
  - 2. TelephonyManager check
    If you are using emulators, you will find that emulators usually do not have the sim card information. 
    In this case, if the malware samples check for TelephonyManager properties in the emulator, 
    they will know.
    To solve this type of checking:




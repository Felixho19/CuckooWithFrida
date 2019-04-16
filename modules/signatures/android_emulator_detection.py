# Copyright (C) Check Point Software Technologies LTD.
# This file is part of Cuckoo Sandbox - http://www.cuckoosandbox.org
# See the file 'docs/LICENSE' for copying permission.

from lib.cuckoo.common.abstracts import Signature

class AndroidEmulatorDetect(Signature):
    name = "application_emulator_detection"
    description = "Application Emulator Detection"
    severity = 1
    categories = ["android"]
    authors = ["felixho"]
    minimum = "0.5"

    def run(self):
        try:
            if "emulator_detection" in self.results["droidmon"]:
                for activity in self.results["droidmon"]["emulator_detection"]:
                    self.add_match(None, "Emulator Detection", activity)
        except:
            pass

        finally:
            return self.has_matches()
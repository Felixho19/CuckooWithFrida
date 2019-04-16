import logging
from lib.cuckoo.api.script import get_script
from lib.cuckoo.core.startup import init_logging

if __name__ == "__main__":
    log = logging.getLogger()
    init_logging()
    log.setLevel(logging.DEBUG)
else:
    log = logging.getLogger(__name__)

s = get_script("android_test")
log.debug(s)

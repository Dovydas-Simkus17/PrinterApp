import usb.core
import usb.util
import sys

class find_class(object):
    def __init__(self, class_):
        self._class = class_
    def __call__(self, device):
        # first, let's check the device
        if device.bDeviceClass == self._class:
            return True
        # ok, transverse all devices to find an
        # interface that matches our class
        for cfg in device:
            # find_descriptor: what's it?
            intf = usb.util.find_descriptor(
                                        cfg,
                                        bInterfaceClass=self._class
                                )
            if intf is not None:
                return True

        return False

printers = usb.core.find(find_all=1, custom_match=find_class(7))

for dev in printers:
    print(dev)
    #print(dev[7])
    print(f"This is the idVendor: {hex(dev.idVendor)}")
    print(f"This is the idProduct: {hex(dev.idProduct)}")
    print(f"This is the iManufacturer: {usb.util.get_string(dev,dev.iManufacturer)}")
    print(f"This is the iProduct: {usb.util.get_string(dev,dev.iProduct)}")

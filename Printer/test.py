import usb.core
import usb.util

VENDOR = 0x04f9
PRODUCT = 0x2015

dev = usb.core.find(idVendor=VENDOR, idProduct=PRODUCT)

print("Device:", dev)

if dev is None:
    raise ValueError('Device not found')

#Detach kernel driver if necessary
try:
    if dev.is_kernel_driver_active(0):
        print("Detaching kernel driver...")
        dev.detach_kernel_driver(0)
except Exception as e:
    print("Kernel detach failed: ", e)

#Set config
try:
    dev.set_configuration()
    print("Config set")
except Exception as e:
    print("Config error: ", e)

#Claim interface
cfg = dev.get_active_configuration()
intf = cfg[(0,0)]

print("Interface:", intf)

#Try string descriptors
try:
    print("LangID:", dev.langids)
except Exception as e:
    print("LangID error: ", e)
try:
    print("Manufacturer:", usb.util.get_string(dev, dev.iManufacturer))
except Exception as e:
    print("Manufacturer error: ", e)
try:
    print("Product:", usb.util.get_string(dev, dev.iProduct))
except Exception as e:
    print("Product error: ", e)

print("Test Finished")
import qrcode
import usb.core
import usb.util
import sys
from PIL import Image, ImageDraw
from brother_ql.conversion import convert
from brother_ql.backends.helpers import send
from brother_ql.raster import BrotherQLRaster

# find the printers connected to the system
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
# variable for boxes with order request
#b = int(input("Please enter number of boxes: "))
#   Record Variables   #
"""
#   Create QR Code   #
order = input("Please enter order number: ")
qr = qrcode.make(order)
size = (145,145)
qr_image = qr.resize(size)
"""

f = open("./Printer/asda.txt")
finalText = ""
label_height = 0
for x in f:
    finalText += x+ "\n"
    label_height+=15
#   Draw print file   #
label_images = []
label_width = 150
for i in range(1):
    #print("Box", i+1, "of", b)
    im = Image.new("L", (label_height, label_width), color = "white")
    g = ImageDraw.Draw(im)
    g.multiline_text((0,0),finalText,spacing=1,fill='black')    
    #   Paste QR on file   #
    #im.paste(qr_image)
    #im = im.resize((label_width,im.height))
    label_images.append(im)


#   Printer Code Below   #
"""
#Testing to find values
for dev in printers:
    print(dev)
    #print(dev[7])
    print(f"This is the idVendor: {hex(dev.idVendor)}")
    print(f"This is the idProduct: {hex(dev.idProduct)}")
    print(f"This is the iManufacturer: {usb.util.get_string(dev,dev.iManufacturer)}")
    print(f"This is the iProduct: {usb.util.get_string(dev,dev.iProduct)}")
"""
"""
# 1. Open the image
img = Image.open("./Printer/apple.png")
image_height = 200
image_width = 300
im = Image.new("L", (image_height, image_width), color = "white")
g = ImageDraw.Draw(im)
g.bitmap((0,0),img,fill='black')
label_images = im.resize((image_width,im.height))
"""
# initalise the variables before going into loop
idVendor = 0
idProduct = 0
iManufacturer = ""
iProduct = ""
for dev in printers:
    idVendor = hex(dev.idVendor)
    idProduct = hex(dev.idProduct)
    iManufacturer = usb.util.get_string(dev,dev.iManufacturer)
    iProduct = usb.util.get_string(dev,dev.iProduct)
# Setting Printer Specificiations
backend = 'pyusb'    # 'pyusb', 'linux_kernal', 'network'
model = iProduct 
printer = f'usb://{idVendor}:{idProduct}'    

# im = Image.new("L", (696, 300), "white")
qlr = BrotherQLRaster(model)
qlr.exception_on_warning = True
qlr.cut_at_end = True
# Converting print instructions for the Brother printer
instructions = convert(
        qlr=qlr, 
        images=label_images,    #  Takes a list of file names or PIL objects.
        label='62', 
        rotate='0',    # 'Auto', '0', '90', '270'
        threshold=70.0,    # Black and white threshold in percent.
        dither=False, 
        compress=False, 
        dpi_600=False, 
        hq=True,    # False for low quality.
        cut=True
)

send(instructions=instructions, printer_identifier=printer,backend_identifier=backend, blocking=True)
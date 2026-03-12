import qrcode
from PIL import Image, ImageDraw
from brother_ql.conversion import convert
from brother_ql.backends.helpers import send
from brother_ql.raster import BrotherQLRaster

#   Record Variables   #
# variable for boxes with order request
b = int(input("Please enter number of boxes: "))
# alias of person to deliver order request
d = input("Please enter alias for deliverer: ")
# alias of person to receive order request
r = input("Please enter alias for recipient: ")

#   Variables Output   #
print("Delivered by:", d)
print("Recieved by:", r)

#   Create QR Code   #
order = input("Please enter order number: ")
qr = qrcode.make(order)
size = (145,145)
qr_image = qr.resize(size)

#   Draw print file   #
label_images = []
for i in range(b):
    print("Box", i+1, "of", b)
    im = Image.new("L", (150, 300), color = "white")
    g = ImageDraw.Draw(im)
    g.text((10,150), "Order Number: " + order + "\nDelivered by: " + d + "\nRecieved by: " + r + "\nNumber of boxes: " + str(b) + f"Box {i} of {b}", fill="black")
    
    #   Paste QR on file   #
    im.paste(qr_image)
    label_images.append(im)

#   Printer Code Below   #

# Setting Printer Specificiations
backend = 'pyusb'    # 'pyusb', 'linux_kernal', 'network'
model = 'QL-500' 
Vendor = "04F9"
PID = "2015"
printer = f'usb://0x04f9:0x2015'    

# im = Image.new("L", (696, 300), "white")
qlr = BrotherQLRaster(model)
qlr.exception_on_warning = True

# Converting print instructions for the Brother printer
instructions = convert(
        qlr=qlr, 
        images=label_images,    #  Takes a list of file names or PIL objects.
        label='62', 
        rotate='90',    # 'Auto', '0', '90', '270'
        threshold=70.0,    # Black and white threshold in percent.
        dither=False, 
        compress=False, 
        dpi_600=False, 
        hq=True,    # False for low quality.
        cut=True
)

send(instructions=instructions, printer_identifier=printer, backend_identifier=backend, blocking=True)
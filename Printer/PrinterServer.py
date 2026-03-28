import sys
import logging
import asyncio
import threading
import qrcode
import usb.core
import usb.util
from PIL import Image, ImageDraw
from brother_ql.conversion import convert
from brother_ql.backends.helpers import send
from brother_ql.raster import BrotherQLRaster
from typing import Any, Union
from bless import (  # type: ignore
    BlessServer,
    BlessGATTCharacteristic,
    GATTCharacteristicProperties,
    GATTAttributePermissions,
)

SERVICE_UUID = "0000feed-0000-1000-8000-00805f9b34fb"
CHAR_UUID = "0000beef-0000-1000-8000-00805f9b34fb"

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

def BrotherPrint(value):
    
    finalText = value
    label_height = 15
    #for x in f:
    #    finalText += x + "\n"
    #    label_height+=15
    label_images = []
    label_width = 150
    for i in range(b):
        print("Box", i+1, "of", b)
        im = Image.new("L", (label_width, label_height), color = "white")
        g = ImageDraw.Draw(im)
        g.multiline_text((0,0),finalText,spacing=1, fill="black")

        
        #   Paste QR on file   #
        #im.paste(qr_image)
        #im = im.resize((label_width,im.height))
        label_images.append(im)
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
    print(model)
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

def handle_command(value):
    command = value.decode()
    print("Received command: ", command)
    
    BrotherPrint(command)
    if command == "PRINT":
        print("Trigger printer")
    elif command[5:] == "TEXT:":
        print("Print text",command[5:])
        
        
def write_request(characteristic: BlessGATTCharacteristic, value:Any, **kwargs):
        characteristic.value = value
        handle_command(characteristic.value) 

async def main():
    server = BlessServer(name="PiPrinter")
    server.write_request_func = write_request
    await server.add_new_service(SERVICE_UUID)
    
    
    char_flags = (
        #GATTCharacteristicProperties.read |
        GATTCharacteristicProperties.write 
        #| GATTCharacteristicProperties.indicate
    )
    permissions = GATTAttributePermissions.readable | GATTAttributePermissions.writeable 
    value = bytearray(b"")
    
    await server.add_new_characteristic(
        SERVICE_UUID,
        CHAR_UUID,
        char_flags,
        value,
        permissions
    )
    
    
    
    await server.start()
    print("BLE server running...")
    
    while True:
        await asyncio.sleep(1)

asyncio.run(main())

/*
Sample code from:
https://github.com/friyiajr/BLESampleExpo/blob/main/useBLE.ts
*/

import { useState } from "react";
import { BleManager, Device } from "react-native-ble-plx";
import { Buffer } from "buffer";

//These will be found on the server code
const SERVICE_UUID = "0000feed-0000-1000-8000-00805f9b34fb";
const CHAR_UUID = "0000beef-0000-1000-8000-00805f9b34fb";

const manager = new BleManager();

export function useBLE() {
  const [device, setDevice] = useState<Device | null>(null);

  // Scan for the Pi
  const scan = () => {
    manager.startDeviceScan(null, null, (error, dev) => {
      console.log("scanning");
      //Error will happen with denied permissions
      if (error) {
        console.log(error);
        console.log("failed");
        return;
      }

      //Find server based on server name
      if (dev?.name?.includes("PiPrinter")||
        dev?.localName?.includes("PiPrinter")) {
        console.log("Found Pi:", dev.name);
        manager.stopDeviceScan();
        console.log("found");
        connect(dev);
      }
    });
  };

  //Connect
  const connect = async (dev: Device) => {
    try {
      console.log("connecting");
      const connected = await dev.connect();
      await connected.discoverAllServicesAndCharacteristics();

      console.log("Connected!");
      console.log("connected");
      setDevice(connected);
    } catch (e) {
      console.log("failed");
      console.error("Connection error:", e);
    }
  };

  //Send command
  const sendCommand = async (data: String) => {
    if (!device) {
      console.log("No device connected");
      return;
    }

    try {

      //The bluetooth module requires Base64
      const base64 = Buffer.from(data, "utf-8").toString("base64");

      //Send to server, don't care for response
      await device.writeCharacteristicWithoutResponseForService(
        SERVICE_UUID,
        CHAR_UUID,
        base64
      );

      console.log("Sent:", data);
    } catch (e) {
      console.error("Write failed:", e);
    }
  };

  return {
    scan,
    sendCommand,
    device,
  };
}
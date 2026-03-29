/*
Sample code from:
https://github.com/friyiajr/BLESampleExpo/blob/main/useBLE.ts
*/

import { useState } from "react";
import { BleManager, Device } from "react-native-ble-plx";
import { Buffer } from "buffer";

const SERVICE_UUID = "12345678-1234-1234-1234-123456789abc";
const CHAR_UUID = "abcd1234-5678-1234-5678-123456789abc";

const manager = new BleManager();

export function useBLE() {
  const [device, setDevice] = useState<Device | null>(null);

  // 🔍 Scan for your Pi
  const scan = () => {
    manager.startDeviceScan(null, null, (error, dev) => {
      if (error) {
        console.log(error);
        return;
      }

      if (dev?.name === "PiPrinter") {
        console.log("Found Pi:", dev.name);
        manager.stopDeviceScan();
        connect(dev);
      }
    });
  };

  // 🔗 Connect
  const connect = async (dev: Device) => {
    try {
      const connected = await dev.connect();
      await connected.discoverAllServicesAndCharacteristics();

      console.log("Connected!");
      setDevice(connected);
    } catch (e) {
      console.error("Connection error:", e);
    }
  };

  // ✍️ Send command (THIS is your main function)
  const sendCommand = async (data: object) => {
    if (!device) {
      console.log("No device connected");
      return;
    }

    try {
      const json = JSON.stringify(data);

      // BLE PLX requires Base64
      const base64 = Buffer.from(json, "utf-8").toString("base64");

      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHAR_UUID,
        base64
      );

      console.log("Sent:", json);
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
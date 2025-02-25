import { nanoid } from "@reduxjs/toolkit";
import { TelemetryData } from "../types/Telemetry";
import {
  batteryLevelSegments,
  batteryTemperatureSegments,
  speedSegments,
} from "src/features/dashboard/Overview/ValidationSegments";
import { Notification } from "src/types/Notification";

export function getRandomNumber(
  min: number,
  max: number,
  decimalPlaces = 2
): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
}

function getRandomDriveMode(): "Moving" | "Charging" | "Idle" {
  const modes: ("Moving" | "Charging" | "Idle")[] = [
    "Moving",
    "Charging",
    "Idle",
  ];
  return modes[Math.floor(Math.random() * modes.length)];
}

export function generateTelemetryData(): TelemetryData {
  return {
    win: nanoid(),
    speed: getRandomNumber(0, 25), // km/h
    distance: getRandomNumber(0, 1000), // km
    batteryLevel: getRandomNumber(0, 100), // %
    batteryHealth: getRandomNumber(80, 100), // %
    chargingPower: getRandomNumber(0, 350), // kW
    energyConsumption: getRandomNumber(100, 250), // Wh/km
    estimatedRange: getRandomNumber(50, 250), // km
    mode: getRandomDriveMode(),
    gpsLocation: {
      lat: getRandomNumber(50.957, 50.959, 6),
      lon: getRandomNumber(6.798, 6.8, 6),
      elevation: getRandomNumber(250, 300), // meters
    },
    hvacPowerUsage: getRandomNumber(0, 5), // kW
    brakePadWear: getRandomNumber(0, 100), // %
    axleLoad: getRandomNumber(20, 100), // %
    weightDistribution: getRandomNumber(40, 60), // %
    batteryTemperature: getRandomNumber(15, 45), // °C
    motorTemperature: getRandomNumber(20, 100), // °C
    chargingCycles: Math.floor(getRandomNumber(50, 1000)), // Count
    gridToWheelEfficiency: getRandomNumber(75, 95), // %
    peakPowerUsage: getRandomNumber(50, 250), // kW
    idleEnergyLoss: getRandomNumber(1, 20), // Wh/h
    torqueOutput: getRandomNumber(100, 1000), // Nm
    regenBrakingEfficiency: getRandomNumber(50, 90), // %
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(parseFloat(value.toFixed(2)), min), max);
}

export function updateTelemetryData(prevData: TelemetryData): TelemetryData {
  let newMode = prevData.mode;
  if (prevData.speed === 0 && prevData.mode !== "Idle") {
    newMode = "Idle";
  } else if (prevData.batteryLevel === 0 && prevData.mode !== "Charging") {
    newMode = "Charging";
  } else if (prevData.batteryLevel > 99) {
    newMode = "Moving";
  }

  if (newMode === "Idle" || newMode === "Charging") {
    return {
      ...prevData,
      speed: 0,
      idleEnergyLoss: getRandomNumber(1, 20),
      batteryLevel: clamp(
        prevData.batteryLevel + getRandomNumber(0, 1),
        0,
        100
      ),
      batteryTemperature: clamp(
        prevData.batteryTemperature + getRandomNumber(-1, 1),
        15,
        45
      ),
      motorTemperature: clamp(
        prevData.motorTemperature + getRandomNumber(-2, 2),
        20,
        100
      ),
      chargingPower: prevData.batteryLevel < 100 ? getRandomNumber(0, 350) : 0,
      torqueOutput: 0,
      mode: newMode, // Set mode to Idle or Charging
    };
  }

  // If the mode is not "Idle" or "Charging", apply the usual randomization logic
  return {
    ...prevData,
    speed: clamp(prevData.speed + getRandomNumber(-3, 3), 0, 25),
    distance: clamp(prevData.distance + Math.random(), 0, 100000),
    batteryLevel: clamp(prevData.batteryLevel - getRandomNumber(0, 1), 0, 100),
    chargingPower: 0,
    energyConsumption: getRandomNumber(100, 250), // Randomized per trip
    estimatedRange: clamp(
      prevData.estimatedRange - getRandomNumber(1, 5),
      10,
      500
    ),
    hvacPowerUsage: getRandomNumber(0, 5), // Random based on climate control
    brakePadWear: clamp(
      prevData.brakePadWear + getRandomNumber(0, 0.1),
      0,
      100
    ),
    axleLoad: getRandomNumber(20, 100),
    weightDistribution: getRandomNumber(40, 60),
    batteryTemperature: clamp(
      prevData.batteryTemperature + getRandomNumber(-1, 1),
      15,
      45
    ),
    motorTemperature: clamp(
      prevData.motorTemperature + getRandomNumber(-2, 2),
      20,
      100
    ),
    gridToWheelEfficiency: clamp(
      prevData.gridToWheelEfficiency + getRandomNumber(-1, 1),
      75,
      95
    ),
    peakPowerUsage: getRandomNumber(50, 250),
    torqueOutput: clamp(
      prevData.torqueOutput + getRandomNumber(-10, 10),
      100,
      1000
    ),
    regenBrakingEfficiency: clamp(
      prevData.regenBrakingEfficiency + getRandomNumber(-2, 2),
      50,
      90
    ),
    gpsLocation: {
      lat: getRandomNumber(50.957, 50.959, 6),
      lon: getRandomNumber(6.798, 6.8, 6),
      elevation: getRandomNumber(250, 300), // meters
    },
    mode: newMode,
  };
}

export function aggregateTelemetryData(items: TelemetryData[]) {
  const count = items.length;
  if (count === 0) return null;

  const avgSpeed = items.reduce((sum, item) => sum + item.speed, 0) / count;
  const avgBattery =
    items.reduce((sum, item) => sum + item.batteryLevel, 0) / count;
  const avgBatteryHealth =
    items.reduce((sum, item) => sum + item.batteryHealth, 0) / count;
  const totalDistance = items.reduce((sum, item) => sum + item.distance, 0);
  const avgEstimatedRange =
    items.reduce((sum, item) => sum + item.estimatedRange, 0) / count;
  const avgBatteryTemperature =
    items.reduce((sum, item) => sum + item.batteryTemperature, 0) / count;
  const avgMotorTemperature =
    items.reduce((sum, item) => sum + item.motorTemperature, 0) / count;
  const lowestEfficiency = Math.min(
    ...items.map((item) => item.gridToWheelEfficiency)
  );
  const highestEfficiency = Math.max(
    ...items.map((item) => item.gridToWheelEfficiency)
  );
  const highestIdleEnergyLoss = Math.max(
    ...items.map((item) => item.idleEnergyLoss)
  );
  const movingVehicles = items.filter(({ mode }) => mode === "Moving").length;
  const chargingVehicles = items.filter(
    ({ mode }) => mode === "Charging"
  ).length;
  const idleVehicles = items.filter(({ mode }) => mode === "Idle").length;

  return {
    avgSpeed: Math.round(avgSpeed),
    avgBattery: Math.round(avgBattery),
    avgBatteryHealth: Math.round(avgBatteryHealth),
    totalDistance: Math.round(totalDistance),
    avgEstimatedRange: Math.round(avgEstimatedRange),
    avgBatteryTemperature: Math.round(avgBatteryTemperature),
    avgMotorTemperature: Math.round(avgMotorTemperature),
    lowestEfficiency: Math.round(lowestEfficiency),
    highestEfficiency: Math.round(highestEfficiency),
    highestIdleEnergyLoss: Math.round(highestIdleEnergyLoss),
    movingVehicles,
    chargingVehicles,
    idleVehicles,
  };
}

export const validateTelemetryData = (data: TelemetryData): Notification[] => {
  const { speed, batteryLevel, batteryTemperature, win } = data;

  const segments = [
    { value: speed, source: speedSegments() },
    { value: batteryLevel, source: batteryLevelSegments() },
    { value: batteryTemperature, source: batteryTemperatureSegments() },
  ];

  const notifications = segments
    .map(({ value, source }) =>
      source.find(({ range: { min, max } }) => value >= min && value <= max)
    )
    .filter((s) => !!s && !!s.message)
    .map((segment) => ({
      win,
      isWarning: segment?.isWarning ?? false,
      isCritical: segment?.isCritical ?? false,
      message: segment?.message as string,
    }))
    .filter((n) => n.isWarning || n.isCritical);

  return notifications;
};

import {
  batteryHealthSegments,
  batteryLevelSegments,
  batteryTemperatureSegments,
  speedSegments,
} from "./ValidationSegments";
import { TelemetryData, ValidationSegments } from "src/types";

type ConfigType = {
  title: string;
  unit?: string;
  field: keyof TelemetryData;
  modes: TelemetryData["mode"][];
  background?: string;
  segments?: ValidationSegments;
  isGauge?: boolean;
}[];

export const evDataConfig: ConfigType = [
  {
    title: "filterLabelMode",
    field: "mode",
    modes: ["Charging", "Idle", "Moving"],
    background: "#4b66ca",
  },
  {
    title: "telemetryTitleDistance",
    unit: "km",
    field: "distance",
    modes: ["Charging", "Idle", "Moving"],
    background: "#4b9fca",
  },
  {
    title: "telemetryTitleSpeed",
    field: "speed",
    modes: ["Moving"],
    unit: "km/h",
    background: "#89c475",
    segments: speedSegments(),
  },

  {
    title: "telemetryTitleBatteryLevel",
    field: "batteryLevel",
    modes: ["Moving", "Charging", "Idle"],
    unit: "%",
    segments: batteryLevelSegments(),
    isGauge: true,
  },

  {
    title: "telemetryTitleBatteryHealth",
    unit: "%",
    field: "batteryHealth",
    modes: ["Charging", "Moving"],
    isGauge: true,
    segments: batteryHealthSegments(),
  },
  {
    title: "telemetryTitleBatteryTemperature",
    field: "batteryTemperature",
    modes: ["Charging", "Moving", "Idle"],
    isGauge: true,
    segments: batteryTemperatureSegments(),
  },

  {
    title: "telemetryTitleChargingPower",
    unit: "kW",
    field: "chargingPower",
    modes: ["Charging"],
  },
  {
    title: "telemetryTitleChargingCycles",
    unit: "",
    field: "chargingCycles",
    modes: ["Charging"],
  },
  {
    title: "telemetryTitleEstimatedRange",
    unit: "h",
    field: "estimatedRange",
    modes: ["Charging", "Idle", "Moving"],
  },
  {
    title: "telemetryTitleEnergyConsumption",
    unit: "Wh/km",
    field: "energyConsumption",
    modes: ["Idle", "Moving"],
  },
  {
    title: "telemetryTitleHvacPowerUsage",
    unit: "kW",
    field: "hvacPowerUsage",
    modes: ["Idle", "Moving"],
  },
  {
    title: "telemetryTitleMotorTemperature",
    unit: "°C",
    field: "motorTemperature",
    modes: ["Idle", "Moving"],
  },
  {
    title: "telemetryTitleIdleEnergyLoss",
    unit: "Wh/h",
    field: "idleEnergyLoss",
    modes: ["Idle"],
  },
  {
    title: "telemetryTitleEfficiency",
    unit: "%",
    field: "gridToWheelEfficiency",
    modes: ["Moving"],
  },
  {
    title: "telemetryTitlePeakPowerUsage",
    unit: "kW",
    field: "peakPowerUsage",
    modes: ["Moving"],
  },
  {
    title: "telemetryTitleTorqueOutput",
    unit: "Nm",
    field: "torqueOutput",
    modes: ["Moving"],
  },
  {
    title: "telemetryTitleBrakingEfficiency",
    unit: "%",
    field: "regenBrakingEfficiency",
    modes: ["Moving"],
  },
];

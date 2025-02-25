export type TelemetryData = {
  win: string;
  speed: number; // km/h
  distance: number; // km
  batteryLevel: number; // %
  batteryHealth: number; // %
  chargingPower: number; // kW
  energyConsumption: number; // Wh/km
  estimatedRange: number; // km
  mode: "Moving" | "Charging" | "Idle";
  gpsLocation: { lat: number; lon: number; elevation: number }; // GPS data
  hvacPowerUsage: number; // kW
  brakePadWear: number; // %
  axleLoad: number; // %
  weightDistribution: number; // %
  batteryTemperature: number; // °C
  motorTemperature: number; // °C
  chargingCycles: number;
  gridToWheelEfficiency: number; // %
  peakPowerUsage: number; // kW
  idleEnergyLoss: number; // Wh/h
  torqueOutput: number; // Nm
  regenBrakingEfficiency: number; // %
};

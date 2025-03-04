import i18n from "src/i18n";

export const batteryTemperatureSegments = () => [
  {
    range: { min: -40, max: -10 },
    color: "red",
    isCritical: true,
    message: i18n.t("validationMessageTempCriticalLow"),
  },
  {
    range: { min: -10, max: 15 },
    color: "orange",
    isWarning: true,
    message: i18n.t("validationMessageTempLow"),
  },
  { range: { min: 15, max: 35 }, color: "green" },
  {
    range: { min: 35, max: 45 },
    color: "orange",
    isWarning: true,
    message: i18n.t("validationMessageTempHigh"),
  },
  {
    range: { min: 45, max: 65 },
    color: "red",
    isCritical: true,
    message: i18n.t("validationMessageTempCriticalHigh"),
  },
];

export const batteryLevelSegments = () => [
  {
    range: { min: 0, max: 5 },
    color: "red",
    isCritical: true,
    message: i18n.t("validationMessageBatteryCritical"),
  },
  {
    range: { min: 6, max: 20 },
    color: "red",
    isWarning: true,
    isCritical: true,
    message: i18n.t("validationMessageBatteryLow"),
  },
  { range: { min: 21, max: 100 }, color: "green" },
];

export const batteryHealthSegments = () => [
  { range: { min: 0, max: 20 }, color: "red", isCritical: true },
  { range: { min: 21, max: 100 }, color: "green" },
];

export const speedSegments = () => [
  {
    range: { min: 15, max: 20 },
    isWarning: true,
    color: "orange",
    message: i18n.t("validationMessageSpeedHigh"),
  },
  {
    range: { min: 21, max: 25 },
    isCritical: true,
    color: "red",
    message: i18n.t("validationMessageSpeedCritical"),
  },
];

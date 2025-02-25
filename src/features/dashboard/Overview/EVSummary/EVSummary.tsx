import { useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ReactGridLayout, { Responsive, WidthProvider } from "react-grid-layout";

import { DataPlate } from "../components/DataPlate/DataPlate";
import { OverviewMap } from "../OverviewMap/OverviewMap";
import { selectAggregatedTelemetry } from "../../EvListSlice";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./EVSummary.scss";
import { Button } from "src/shared/components/Button";
import { ChevronDown, ChevronUp, Settings } from "@carbon/icons-react";
import { DropDown } from "src/shared/components/DropDown";
import {
  storageSet,
  storageGetKey,
  storageGet,
} from "src/services/localStorage";
import { getUrl, IDENTIFIERS } from "src/services/urlsHelper";
import { useSearchParams } from "react-router";
import { TelemetryData } from "src/types";
import {
  batteryHealthSegments,
  batteryLevelSegments,
} from "../ValidationSegments";

const hiddenFieldsKey = storageGetKey("summaryHiddenFields");
const collapsedKey = storageGetKey("summaryCollapsed");
const fieldsConfigKey = storageGetKey("summaryFieldsConfig");

const storedFieldConfig = storageGet<ReactGridLayout.Layout[]>(
  fieldsConfigKey,
  []
);
const configById: Record<string, ReactGridLayout.Layout> =
  storedFieldConfig.reduce(
    (acc, item) => ({
      ...acc,
      [item.i]: item,
    }),
    {}
  );

const ResponsiveGridLayout = WidthProvider(Responsive);

export function EVSummary() {
  const { t } = useTranslation();
  const summary = useSelector(selectAggregatedTelemetry);
  const [isContentHidden, setIsContentHidden] = useState(
    storageGet(collapsedKey, false)
  );
  const [hiddenFields, setHiddenFields] = useState<string[]>(
    storageGet(hiddenFieldsKey, [])
  );
  const [params] = useSearchParams();
  const sortOrder = params.get("sortOrder");

  const getSortUrl = (key: keyof TelemetryData) => {
    return getUrl(IDENTIFIERS.HOME, {
      sortBy: key,
      sortOrder: sortOrder === "asc" ? "desc" : "asc",
    });
  };

  const getModeUrl = (mode: TelemetryData["mode"]) =>
    getUrl(IDENTIFIERS.HOME, { mode });

  const items = [
    {
      id: "map",
      title: t("summaryMap"),
      layout: { w: 6, h: 8, x: 6, y: 0 },
    },
    {
      id: "avgSpeed",
      title: t("summaryAvgSpeed"),
      sourceField: "avgSpeed",
      unitDescription: "km/h",
      props: { background: "#89c475" },
      layout: { w: 2, h: 2, x: 0, y: 0 },
      href: getSortUrl("speed"),
    },
    {
      id: "totalDistance",
      title: t("summaryTotalDistance"),
      sourceField: "totalDistance",
      unitDescription: "km",
      props: { background: "#4b9fca" },
      layout: { w: 2, h: 2, x: 2, y: 0 },
      href: getSortUrl("distance"),
    },
    {
      id: "movingVehicles",
      title: t("summaryMovingVehicles"),
      sourceField: "movingVehicles",
      layout: { w: 2, h: 2, x: 0, y: 6 },
      unitDescription: "",
      href: getModeUrl("Moving"),
    },
    {
      id: "idleVehicles",
      title: t("summaryIdleVehicles"),
      sourceField: "idleVehicles",
      layout: { w: 2, h: 2, x: 2, y: 6 },
      unitDescription: "",
      href: getModeUrl("Idle"),
    },
    {
      id: "chargingVehicles",
      title: t("summaryChargingVehicles"),
      sourceField: "chargingVehicles",
      layout: { w: 2, h: 2, x: 4, y: 6 },
      unitDescription: "",
      href: getModeUrl("Charging"),
    },
    {
      id: "batteryLevel",
      title: t("telemetryTitleBatteryLevel"),
      isGauge: true,
      segments: batteryLevelSegments(),
      sourceField: "avgBattery",
      layout: { w: 2, h: 2, x: 4, y: 0 },
      unitDescription: "%",
      href: getSortUrl("batteryLevel"),
    },
    {
      id: "batteryHealth",
      title: t("telemetryTitleBatteryHealth"),
      isGauge: true,
      segments: batteryHealthSegments(),
      sourceField: "avgBatteryHealth",
      layout: { w: 2, h: 2, x: 4, y: 2 },
      unitDescription: "%",
      href: getSortUrl("batteryHealth"),
    },
    {
      id: "avgEstimatedRange",
      title: t("summaryAvgEstimatedRange"),
      sourceField: "avgEstimatedRange",
      unitDescription: "km",
      layout: { w: 2, h: 2, x: 2, y: 2 },
      href: getSortUrl("estimatedRange"),
    },
    {
      id: "avgBatteryTemperature",
      title: t("summaryAvgBatteryTemperature"),
      sourceField: "avgBatteryTemperature",
      unitDescription: "°C",
      layout: { w: 2, h: 2, x: 2, y: 4 },
      href: getSortUrl("batteryTemperature"),
    },
    {
      id: "avgMotorTemperature",
      title: t("summaryAvgMotorTemperature"),
      sourceField: "avgMotorTemperature",
      unitDescription: "°C",
      layout: { w: 2, h: 2, x: 0, y: 4 },
      href: getSortUrl("motorTemperature"),
    },
    {
      id: "lowestEfficiency",
      title: t("summaryLowestEfficiency"),
      sourceField: "lowestEfficiency",
      unitDescription: "%",
      layout: { w: 2, h: 2, x: 4, y: 4 },
      href: getSortUrl("gridToWheelEfficiency"),
    },
    {
      id: "highestEfficiency",
      title: t("summaryHighestEfficiency"),
      sourceField: "highestEfficiency",
      unitDescription: "%",
      layout: { w: 2, h: 2, x: 0, y: 8 },
      href: getSortUrl("gridToWheelEfficiency"),
    },
    {
      id: "highestIdleEnergyLoss",
      title: t("summaryHighestIdleEnergyLoss"),
      sourceField: "highestIdleEnergyLoss",
      unitDescription: "Wh/h",
      layout: { w: 2, h: 2, x: 0, y: 2 },
      href: getSortUrl("idleEnergyLoss"),
    },
  ];

  const handleToggleField = (field: string) =>
    setHiddenFields((prev) => {
      const newHiddenFields = prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field];
      storageSet(hiddenFieldsKey, newHiddenFields);
      return newHiddenFields;
    });

  const handleToggleHidden = () =>
    setIsContentHidden((prev) => {
      storageSet(collapsedKey, !prev);
      return !prev;
    });

  const storeFieldsConfig = (config: ReactGridLayout.Layout[]) => {
    storageSet(fieldsConfigKey, config);
  };

  const options = items.map((i) => ({
    label: i.title,
    value: i.id,
    onClick: () => handleToggleField(i.id),
    checked: !hiddenFields.includes(i.id),
  }));

  return (
    <div className="summary__wrapper">
      <div className="summary__title">
        <h2>{t("summaryStatisticsForAllVehicles")}</h2>
        <div className="summary__actions">
          <DropDown isRounded isTransparent options={options}>
            <Settings size={20} />
          </DropDown>
          <Button onClick={handleToggleHidden} isRounded isTransparent>
            {isContentHidden ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronUp size={20} />
            )}
          </Button>
        </div>
      </div>
      {summary && !isContentHidden && (
        <ResponsiveGridLayout
          className="summary__layout"
          layouts={{
            lg: items
              .filter(({ id }) => !hiddenFields.includes(id))
              .map(({ id, layout }) => ({
                ...(configById[id] ?? layout),
                i: id,
              })),
          }}
          breakpoints={{ lg: 1200, md: 986, sm: 560 }}
          cols={{ lg: 12, md: 6, sm: 4 }}
          rowHeight={60}
          width={1200}
          draggableHandle=".data-plate__title"
          isDraggable={true}
          isResizable={false}
          onLayoutChange={storeFieldsConfig}
        >
          {items
            .filter(({ id }) => !hiddenFields.includes(id))
            .map(
              ({
                id,
                href,
                title,
                sourceField,
                unitDescription,
                segments,
                props,
              }) => (
                <div key={id}>
                  {id === "map" ? (
                    <OverviewMap title={title} />
                  ) : (
                    <DataPlate
                      title={title}
                      value={summary[sourceField as keyof typeof summary] || 0}
                      unitDescription={unitDescription}
                      segments={segments}
                      href={href}
                      {...props}
                    />
                  )}
                </div>
              )
            )}
        </ResponsiveGridLayout>
      )}
    </div>
  );
}

import "./EVList.scss";

import { EVTable } from "./EVTable";
import { useEVList } from "./useEVList";
import { EvPlate } from "../components/EvPlate";
import { useAppTranslation } from "src/hooks";
import { FILTER_ALL_VALUE } from "src/constants";

export function EVList() {
  const { t } = useAppTranslation();

  const filterFields = [
    { name: "search", label: t("filterLabelSearch") },
    {
      name: "mode",
      label: t("filterLabelMode"),
      options: [
        { value: FILTER_ALL_VALUE, label: t("filterLabelAll") },
        { value: "Moving", label: t("filterLabelMoving") },
        { value: "Idle", label: t("filterLabelIdle") },
        { value: "Charging", label: t("filterLabelCharging") },
      ],
    },
    {
      name: "sortBy",
      label: t("filterLabelSortBy"),
      options: [
        { value: "win", label: t("filterLabelWin") },
        { value: "batteryLevel", label: t("filterLabelBatteryLevel") },
        { value: "speed", label: t("filterLabelSpeed") },
        { value: "distance", label: t("filterLabelDistance") },
      ],
    },
    {
      name: "sortOrder",
      label: t("filterLabelSortOrder"),
      options: [
        { value: "asc", label: t("filterLabelAsc") },
        { value: "desc", label: t("filterLabelDesc") },
      ],
    },
  ];
  const { filters, filteredData, view } = useEVList(filterFields);

  return (
    <>
      {filters}
      {view === "grid" ? (
        <>
          {filteredData.map((ev) => {
            return <EvPlate key={ev.win} win={ev.win} />;
          })}
        </>
      ) : (
        <EVTable data={filteredData} />
      )}
    </>
  );
}

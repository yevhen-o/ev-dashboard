import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Settings, Table as TableIcon } from "@carbon/icons-react";

import {
  useFilters,
  useSortWorker,
  useSearchParamsAsValues,
  useAppTranslation,
  useTypedSelector,
  useActions,
} from "src/hooks";
import i18n from "src/i18n";
import { EvPlate } from "../components/EvPlate";
import { FILTER_ALL_VALUE } from "src/constants";
import { DropDown } from "src/components/DropDown";
import { selectItemsAsArray } from "../../EvListSlice";
import { evDataConfig } from "../evDataConfig";
import "./EVList.scss";
import { SortTypes } from "src/services/sortBy/sortBy";
import { TelemetryData } from "src/types";
import {
  storageGet,
  storageGetKey,
  storageSet,
} from "src/services/localStorage";
import { Button } from "src/components/Button";

import { EVTable } from "./EVTable";

const filterFunctions = {};
const initialFilterValues = {};
const layoutViewKey = storageGetKey("layoutView");

export function EVList() {
  const { t } = useAppTranslation();

  const hiddenFields = useTypedSelector((state) => state.layout.hiddenFields);
  const [view, setView] = useState<"grid" | "table">(
    storageGet(layoutViewKey, "grid")
  );

  const toggleView = () => {
    setView((prev) => {
      const nextView = prev === "table" ? "grid" : "table";
      storageSet(layoutViewKey, nextView);
      return nextView;
    });
  };

  const { removeFieldHidden, setFieldHidden } = useActions();

  const handleHideField = (field: keyof TelemetryData) => () => {
    if (hiddenFields.includes(field)) {
      removeFieldHidden(field);
    } else {
      setFieldHidden(field);
    }
  };

  const options = [
    ...evDataConfig.map((item) => ({
      label: t(item.title),
      value: item.field,
      onClick: handleHideField(item.field),
      checked: !hiddenFields.includes(item.field),
    })),
  ];
  const data = useSelector(selectItemsAsArray);

  const initialized = i18n.isInitialized;
  const language = i18n.language;

  const filterFields = useMemo(() => {
    if (!initialized || !language) return [];

    return [
      { name: "search", label: i18n.t("filterLabelSearch") },
      {
        name: "mode",
        label: i18n.t("filterLabelMode"),
        options: [
          { value: FILTER_ALL_VALUE, label: i18n.t("filterLabelAll") },
          { value: "Moving", label: i18n.t("filterLabelMoving") },
          { value: "Idle", label: i18n.t("filterLabelIdle") },
          { value: "Charging", label: i18n.t("filterLabelCharging") },
        ],
      },
      {
        name: "sortBy",
        label: i18n.t("filterLabelSortBy"),
        options: [
          { value: "win", label: i18n.t("filterLabelWin") },
          { value: "batteryLevel", label: i18n.t("filterLabelBatteryLevel") },
          { value: "speed", label: i18n.t("filterLabelSpeed") },
          { value: "distance", label: i18n.t("filterLabelDistance") },
        ],
      },
      {
        name: "sortOrder",
        label: i18n.t("filterLabelSortOrder"),
        options: [
          { value: "asc", label: i18n.t("filterLabelAsc") },
          { value: "desc", label: i18n.t("filterLabelDesc") },
        ],
      },
    ];
  }, [initialized, language]);

  const { values } = useSearchParamsAsValues();
  const appliedIsSortedAsc = values.sortOrder === "desc" ? false : true;

  const { sortedData } = useSortWorker(
    data || [],
    values?.sortBy || "win",
    appliedIsSortedAsc,
    values?.sortBy === "win" || !values?.sortBy
      ? SortTypes.string
      : SortTypes.int
  );

  const { filters, filteredData } = useFilters(
    sortedData,
    initialFilterValues,
    filterFields,
    filterFunctions
  );

  return (
    <>
      <div className="ev-list__filters">
        {filters}
        <Button isRounded isTransparent onClick={toggleView}>
          {view === "table" ? <Grid size={20} /> : <TableIcon size={20} />}
        </Button>
        <DropDown isRounded isTransparent options={options}>
          <Settings size={20} />
        </DropDown>
      </div>
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

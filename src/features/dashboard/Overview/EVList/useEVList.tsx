import { useState } from "react";
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

import { DropDown } from "src/components/DropDown";
import { selectItemsAsArray } from "../../EvListSlice";
import { evDataConfig } from "../evDataConfig";
import { SortTypes } from "src/services/sortBy/sortBy";
import { FieldType, TelemetryData } from "src/types";
import {
  storageGet,
  storageGetKey,
  storageSet,
} from "src/services/localStorage";
import { Button } from "src/components/Button";

const filterFunctions = {};
const initialFilterValues = {};
const layoutViewKey = storageGetKey("layoutView");

export function useEVList(filterFields: FieldType[]) {
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

  const { filters: commonFilters, filteredData } = useFilters(
    sortedData,
    initialFilterValues,
    filterFields,
    filterFunctions
  );

  const filters = (
    <div className="ev-list__filters">
      {commonFilters}
      <Button
        title={view !== "table" ? t("commonTitleTable") : t("commonTitleGrid")}
        isRounded
        isTransparent
        onClick={toggleView}
      >
        {view === "table" ? <Grid size={20} /> : <TableIcon size={20} />}
      </Button>
      <DropDown
        title={t("commonTitleSettings")}
        isRounded
        isTransparent
        options={options}
      >
        <Settings size={20} />
      </DropDown>
    </div>
  );

  return {
    view,
    filters,
    filteredData,
  };
}

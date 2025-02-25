import { Table } from "src/shared/components/Table";
import { TableField } from "src/shared/components/Table/TableHead";
import classNames from "classnames";

import { evDataConfig } from "../evDataConfig";
import { useAppTranslation, useTypedSelector } from "src/shared/hooks";
import { TelemetryData } from "src/types";

export function EVTable({ data }: { data: TelemetryData[] }) {
  const hiddenFields = useTypedSelector((state) => state.layout.hiddenFields);
  const { t } = useAppTranslation();

  const headerFields: TableField[] = [
    {
      field: "win",
      title: "WIN",
    },
    ...evDataConfig
      .filter((c) => !hiddenFields.includes(c.field))
      .map((c) => ({
        field: c.field,
        title: t(c.title),
        isSortable: false,
      })),
  ];

  const renderFunctions = {
    ...evDataConfig
      .filter((c) => c.segments)
      .reduce(
        (acc, c) => ({
          ...acc,
          [c.field]: (r: TelemetryData) => {
            const value = r[c.field];
            const activeSegment =
              typeof value === "number"
                ? c.segments?.find(
                    ({ range: { min, max } }) => value >= min && value <= max
                  )
                : undefined;
            return (
              <span
                className={classNames("column-plate", {
                  "column-plate--attention": activeSegment?.isWarning,
                  "column-plate--warning": activeSegment?.isCritical,
                })}
              >
                {value.toString()}
              </span>
            );
          },
        }),
        {}
      ),
  };
  return (
    <Table
      name="ev_list"
      headerFields={headerFields}
      data={data}
      renderFunctions={renderFunctions}
    />
  );
}

import "./Table.scss";
import React, { useState, ReactElement, PropsWithChildren } from "react";
import classNames from "classnames";

import TableHead, { TableField } from "./TableHead";
import TableBody from "./TableBody";

type TableProps<O> = {
  name: string;
  headerFields: TableField[];
  wrapperClassName?: string;
  data: O[];
  sortBy?: string;
  isSortedAsc?: boolean;
  isDataFetching?: boolean;
  showEmptyDataMessage?: boolean;
  emptyDataMessageText?: string;
  getRowClasses?: (record: O) => string;
  renderFunctions?: Record<string, (record: O) => React.ReactNode>;
};

const defaultRenderFunction = {};

export const Table = <O extends Record<string, unknown>>({
  data,
  name,
  isSortedAsc,
  sortBy,
  headerFields,
  isDataFetching,
  wrapperClassName,
  showEmptyDataMessage,
  emptyDataMessageText,
  getRowClasses,
  renderFunctions = defaultRenderFunction,
}: PropsWithChildren<TableProps<O>>): ReactElement => {
  const [fieldsToDisplay, setFieldsToDisplay] = useState<string[]>(
    headerFields.map((f) => f.field)
  );

  const configuredFields = headerFields.filter((f) =>
    fieldsToDisplay.includes(f.field)
  );

  const handleSort = (field: TableField) => () => {
    if (!field.isSortable) {
      return;
    }
    // if (field.field === values?.sortBy) {
    //   // handleValuesChange(
    //   //   values.sortOrder ? { sortOrder: "" } : { sortOrder: "desc" }
    //   // );
    // } else {
    //   // handleValuesChange({ sortBy: field.field, sortOrder: "" });
    // }
  };

  return (
    <div
      className={classNames(wrapperClassName, "wrapper", `${name}__wrapper`)}
    >
      <table className={classNames("table", `${name}__table`)}>
        <TableHead
          name={name}
          sortBy={sortBy}
          isSortedAsc={isSortedAsc}
          headerFields={headerFields}
          fieldsToDisplay={fieldsToDisplay}
          configuredFields={configuredFields}
          onSortChange={handleSort}
          setFieldsToDisplay={setFieldsToDisplay}
        />
        <TableBody
          name={name}
          data={data}
          getRowClasses={getRowClasses}
          renderFunctions={renderFunctions}
          configuredFields={configuredFields}
        />
      </table>
      {!!isDataFetching && (
        <div className={"table__cell-shimmer"}>Loading...</div>
      )}
      {!!showEmptyDataMessage && (
        <>{emptyDataMessageText ? emptyDataMessageText : "No data found."}</>
      )}
    </div>
  );
};

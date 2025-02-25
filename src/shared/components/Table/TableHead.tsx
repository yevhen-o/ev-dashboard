import classNames from "classnames";
import { ArrowDown, ArrowUp } from "src/shared/components/Icons";

export interface TableField {
  field: string;
  title?: string;
  isSortable?: boolean;
  isAlwaysVisible?: boolean;
}

type TableHeadProps = {
  name: string;
  fieldsToDisplay: string[];
  headerFields: TableField[];
  onSortChange: (f: TableField) => () => void;
  setFieldsToDisplay: React.Dispatch<React.SetStateAction<string[]>>;
  configuredFields: TableField[];
  sortBy?: string;
  isSortedAsc?: boolean;
};

const TableHead: React.FC<TableHeadProps> = ({
  name,
  sortBy,
  isSortedAsc,
  configuredFields,
  onSortChange,
}) => {
  return (
    <thead>
      <tr className={classNames("row", "row--head", `${name}__row--head`)}>
        {configuredFields.map((f) => (
          <th
            key={f.field}
            className={classNames(
              "caption",
              "cell",
              "cell--head",
              `${name}__cell--head`,
              `${name}__cell--${f.field}`,
              { "cell--sortable": f.isSortable }
            )}
            onClick={onSortChange(f)}
            aria-label={`Change sort field to ${f.title}`}
            role="button"
          >
            {f.title}
            {f.isSortable && (
              <span
                className={classNames("cell__sort-indicator", {
                  "cell__sort-indicator--active": sortBy === f.field,
                })}
              >
                {isSortedAsc || sortBy !== f.field ? (
                  <ArrowDown size={20} />
                ) : (
                  <ArrowUp size={20} />
                )}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;

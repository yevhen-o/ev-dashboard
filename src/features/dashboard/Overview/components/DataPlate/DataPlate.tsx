import classNames from "classnames";

import { ValidationSegments } from "src/types/ValidationSegments";
import "./DataPlate.scss";
import { Link } from "src/services/urlsHelper";
import { Gauge } from "src/shared/components/Gauge";

type BaseProps = {
  title: string;
  value: number | string;
  background?: string;
  segments?: ValidationSegments;
  href?: string;
  unitDescription?: string;
};

type WithValue = BaseProps & {
  isGauge?: never;
};

type WithChildren = BaseProps & {
  isGauge?: boolean;
  value: number;
};

type DataPlateProps = WithValue | WithChildren;

export function DataPlate({
  title,
  value,
  background,
  segments,
  unitDescription,
  isGauge,
  href,
}: DataPlateProps) {
  const activeSegment =
    typeof value === "number"
      ? segments?.find(
          ({ range: { min, max } }) => value >= min && value <= max
        )
      : undefined;

  const CMP = (typeof href === "string" ? Link : "div") as React.ElementType;

  return (
    <CMP
      to={href}
      className={classNames("data-plate", {
        "data-plate--no-background": !background,
        "data-plate--attention": activeSegment?.isWarning,
        "data-plate--warning": activeSegment?.isCritical,
      })}
      style={{ background: background }}
    >
      <div className="data-plate__title">{title}</div>
      <div className="data-plate__value">
        {isGauge ? (
          <Gauge value={value} segments={segments} />
        ) : (
          <div className="data-plate__value-data">
            {value} <span className="data-plate__unit">{unitDescription}</span>
          </div>
        )}
      </div>
    </CMP>
  );
}

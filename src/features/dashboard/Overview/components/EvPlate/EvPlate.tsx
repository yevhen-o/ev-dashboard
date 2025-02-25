import { TelemetryData } from "src/types";
import { useAppTranslation, useTypedSelector } from "src/shared/hooks";
import { evDataConfig } from "src/features/dashboard/Overview/evDataConfig";

import { DataPlate } from "../DataPlate/DataPlate";
import "./EvPlate.scss";

type DataTypeConfig = Omit<TelemetryData, "gpsLocation" | "win" | "mode">;

export function EvPlate({ win }: { win: string }) {
  const ev = useTypedSelector((store) => {
    return store.evList.itemsById[win]
      ? store.evList.itemsById[win]
      : undefined;
  });

  const { t } = useAppTranslation();

  const hiddenFields = useTypedSelector((state) => state.layout.hiddenFields);

  if (!ev) return null;

  return (
    <div className="ev-plate">
      <div className="ev-plate__title">
        <strong>{ev.win}</strong>
      </div>

      <div className="ev-plate__units">
        {evDataConfig
          .filter(
            ({ modes, field }) =>
              modes.includes(ev.mode) && !hiddenFields.includes(field)
          )
          .map(({ title, unit, field, background, isGauge, segments }) => (
            <div key={`${ev.win}__${field}`}>
              <DataPlate
                title={t(title)}
                value={ev[field as keyof DataTypeConfig]}
                unitDescription={unit}
                background={background}
                segments={segments}
                isGauge={isGauge}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

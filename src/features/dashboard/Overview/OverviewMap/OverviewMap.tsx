import { useAppTranslation, useTypedSelector } from "src/hooks";
import calculateMapCenterAndZoom from "../../MapWrapper/CalculateCenterAndZoom";
import { MapWrapper } from "../../MapWrapper/MapWrapper";
import "./OverviewMap.scss";
import classNames from "classnames";
import { useState } from "react";

type MapComponentProps = {
  title: string;
};
export function OverviewMap({ title }: MapComponentProps) {
  const [isInteractive, setIsInteractive] = useState(false);
  const vehicles = useTypedSelector((state) => state.evList.itemsById);
  const { center, zoom } = calculateMapCenterAndZoom(Object.values(vehicles));
  const { t } = useAppTranslation();

  const getPopup = (win: keyof typeof vehicles) => {
    const ev = vehicles[win];
    return (
      <div>
        <strong>{win}</strong>
        <br />
        {t("filterLabelDistance")}: {ev.distance} km
        <br />
        {t("filterLabelMode")}: {ev.mode}
      </div>
    );
  };
  return (
    <div
      onMouseDown={() => setIsInteractive(true)}
      onMouseLeave={() => setIsInteractive(false)}
      className={classNames("overview-map", {
        "overview-map--not-active": !isInteractive,
      })}
    >
      <div className="data-plate__title">
        <strong>{title}</strong>
      </div>
      <MapWrapper
        center={center}
        zoom={zoom}
        markers={Object.values(vehicles).map(
          ({ win, gpsLocation: { lat, lon } }) => ({
            id: win,
            lat,
            lng: lon,
            popup: getPopup(win),
          })
        )}
      />
    </div>
  );
}

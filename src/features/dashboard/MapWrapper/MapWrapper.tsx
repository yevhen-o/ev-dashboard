import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type MapComponentProps = {
  zoom: number;
  center: { lat: number; lng: number };
  markers?: { id: string; lat: number; lng: number; popup: React.ReactNode }[];
};
export function MapWrapper({ zoom, center, markers }: MapComponentProps) {
  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ width: "100%", height: "497px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {markers &&
          markers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={
                new L.Icon({
                  iconUrl:
                    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
                  iconSize: [25, 41],
                })
              }
            >
              <Popup>{marker.popup}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

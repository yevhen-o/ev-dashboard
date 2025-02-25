import L from "leaflet";
import { TelemetryData } from "src/types";

type Vehicle = Pick<TelemetryData, "gpsLocation" | "win">;

const calculateMapCenterAndZoom = (vehicles: Vehicle[]) => {
  if (vehicles.length === 0) {
    return { center: { lat: 0, lng: 0 }, zoom: 10 }; // Return a default center if no vehicles
  }

  // Initialize bounds with the first vehicle's coordinates
  const bounds = new L.LatLngBounds([]);

  // Add each vehicle's location to the bounds
  vehicles.forEach((vehicle) => {
    bounds.extend([vehicle.gpsLocation.lat, vehicle.gpsLocation.lon]);
  });

  // Calculate the center of the bounds
  const center = bounds.getCenter();

  // Calculate the zoom level to fit all vehicles
  const zoom = Math.min(
    16,
    Math.max(
      10,
      Math.round(
        14 -
          Math.log2(
            bounds.getNorthEast().distanceTo(bounds.getSouthWest()) / 50000
          )
      )
    )
  );

  return { center, zoom };
};

export default calculateMapCenterAndZoom;

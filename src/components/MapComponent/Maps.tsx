import "../../index.css";
//import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import LocationMarker from "./LocationMarker";

// Fix icône par défaut
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).toString(),
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).toString(),
});

function ResizeMap() {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 0);
  }, [map]);

  return null;
}


export default function Maps() {


  return (
    <>
      <MapContainer center={[48.8566, 2.3522]} zoom={13} zoomControl={true}>
        <ResizeMap />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* <LocationUser selectedPosition={selectedPosition} /> */}

        <LocationMarker />
      </MapContainer>
    </>
  );
}
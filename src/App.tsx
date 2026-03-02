import Planetarium from "./components/Planetarium/Planetarium"
import { LocationProvider } from "./context/LocationContext"
import L from "leaflet";
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fixed default icon bug
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

export default function App() {

  return (
    <>
      <LocationProvider>
        <Planetarium />
      </LocationProvider>
    </>
  )
}

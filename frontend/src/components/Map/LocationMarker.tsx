import { Marker, useMapEvents } from "react-leaflet"
import { useLocation } from "../../context/LocationContext"

export default function LocationMarker() {
  const { location, updateLocation } = useLocation();

  useMapEvents({

    click(e) {
      const { lat, lng } = e.latlng;
      updateLocation(lat, lng)
    },
  })

  return (
    <Marker position={[location?.lat, location?.lon]} />)
}
import { Marker, useMapEvents } from "react-leaflet"
import { useLocation } from "../../context/LocationContext"

export default function LocationMarker() {
  const { location, updateLocation } = useLocation();

  const map = useMapEvents({
    click(e) {

      const { lat, lng } = e.latlng;
      updateLocation(lat, lng)
      map.flyTo([lat, lng], map.getZoom())
    },
  })

  return (
    <Marker position={[location?.lat, location?.lon]} />)
}
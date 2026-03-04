import { useEffect } from "react"
import { useMap } from "react-leaflet"
import { useLocation } from "../../context/LocationContext"

export default function MapController() {
  const { location } = useLocation()
  const map = useMap()

  const ZOOM = import.meta.env.VITE_ZOOM_LEVEL_DEFAULT;

  useEffect(() => {
    if (!location || !map) return

    map.flyTo(
      [location.lat, location.lon],
      ZOOM,
      { duration: 0.6 }
    )

  }, [location, map])

  return null
}
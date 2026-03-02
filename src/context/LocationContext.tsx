import { createContext, useContext, useState, type ReactNode } from "react"
import type { CoordinatesType, LocationContextType } from "../types/LocationContextType"
import tz_lookup from "tz-lookup";


const LocationContext = createContext<LocationContextType | undefined>(undefined)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<CoordinatesType>(
    {
      lat: 48.8566,
      lon: 2.3522,
      label: "Paris",
      tz: "Europe/Paris"
    }
  )

  function updateLocation(lat: number, lon: number) {
    const label = `Lieu : ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    const tz = tz_lookup(lat, lon);

    setLocation({ lat, lon, label, tz })
  }

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  )
}

export function useLocation() {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useObservation must be used inside ObservationProvider")
  }
  return context
}
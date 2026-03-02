import Planetarium from "./components/Planetarium/Planetarium"
import { LocationProvider } from "./context/LocationContext"


export default function App() {

  return (
    <>
      <LocationProvider>
        <Planetarium />
      </LocationProvider>
    </>
  )
}

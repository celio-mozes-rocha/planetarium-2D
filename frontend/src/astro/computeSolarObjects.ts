import type { SolarSystemObjectType } from "../types/SolarSystemObjectType";
import { computeRiseSet } from "./ComputeRiseSet";
import { RISE_SET_MOON, RISE_SET_SUN } from "./constants";
import { moonEquatorialPosition } from "./moon";
import { sunEquatorialPosition } from "./sun";

export function computeSolarSystemObjects(
  date: Date,
  lat: number,
  lon: number,
): SolarSystemObjectType[] {
  const sun = sunEquatorialPosition(date);
  const moon = moonEquatorialPosition(date);

  // Calcul lever / coucher
  const sunRiseSet = computeRiseSet(
    date,
    lat,
    lon,
    sunEquatorialPosition,
    RISE_SET_SUN,
  );

  const moonRiseSet = computeRiseSet(
    date,
    lat,
    lon,
    moonEquatorialPosition,
    RISE_SET_MOON,
  );

  return [
    {
      code: "sun",
      name: "Soleil",
      ra: sun.ra,
      dec: sun.dec,
      type: "sun",
      angularRadius: 0.265,
      radius: 30,
      riseTime: sunRiseSet.rise,
      setTime: sunRiseSet.set,
    },
    {
      code: "moon",
      name: "Lune",
      ra: moon.ra,
      dec: moon.dec,
      type: "moon",
      angularRadius: 0.26,
      radius: 25,
      riseTime: moonRiseSet.rise,
      setTime: moonRiseSet.set,
    },

    // plus tard : planètes
  ];
}

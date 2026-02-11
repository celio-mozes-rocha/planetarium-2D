import { equatorialToHorizontal } from "./coordinates";
import { localSiderealTime } from "./time";

export function computeRiseSet(
  date: Date,
  lat: number,
  lon: number,
  getRaDec: (d: Date) => { ra: number; dec: number },
  altitudeThreshold = 0,
) {
  const testDate = new Date(date);
  testDate.setHours(0, 0, 0, 0);

  let rise: Date | null = null;
  let set: Date | null = null;

  let prevAlt = null;

  // on balaye la journée toutes les 5 minutes
  for (let minutes = 0; minutes <= 24 * 60; minutes += 5) {
    const d = new Date(testDate.getTime() + minutes * 60000);

    const lst = localSiderealTime(d, lon);
    const { ra, dec } = getRaDec(d);

    const { alt } = equatorialToHorizontal(ra, dec, lat, lst);

    if (prevAlt !== null) {
      // passage du négatif au positif
      if (prevAlt < altitudeThreshold && alt >= altitudeThreshold) {
        rise = new Date(d);
      }

      // passage du positif au négatif
      if (prevAlt > altitudeThreshold && alt <= altitudeThreshold) {
        set = new Date(d);
      }
    }

    prevAlt = alt;
  }

  return { rise, set };
}

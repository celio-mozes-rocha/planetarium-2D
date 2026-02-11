import { sunEquatorialPosition } from "./sun";
// Algorithmes simplifiés basés sur Jean Meeus (Astronomical Algorithms)

function deg2rad(deg: number) {
  return (deg * Math.PI) / 180;
}
function rad2deg(rad: number) {
  return (rad * 180) / Math.PI;
}

export function moonEquatorialPosition(date: Date) {
  // nombre de jours depuis 2000-01-01 12h
  const d = (date.getTime() - Date.UTC(2000, 0, 1, 12)) / 86400000;

  // --- Longitude, anomalie et argument des noeuds ---
  const L = (218.316 + 13.176396 * d) % 360; // longitude moyenne
  const M = (134.963 + 13.064993 * d) % 360; // anomalie
  const F = (93.272 + 13.22935 * d) % 360; // distance noeud

  // --- Longitude et latitude écliptiques simplifiées ---
  const lon =
    L + 6.289 * Math.sin(deg2rad(M)) - 1.274 * Math.sin(deg2rad(2 * L - M));
  const lat = 5.128 * Math.sin(deg2rad(F));

  // --- Conversion écliptique → équatorial ---
  const eps = 23.4397; // obliquité de l’écliptique
  const lonRad = deg2rad(lon);
  const latRad = deg2rad(lat);
  const epsRad = deg2rad(eps);

  const sinDec =
    Math.sin(latRad) * Math.cos(epsRad) +
    Math.cos(latRad) * Math.sin(epsRad) * Math.sin(lonRad);
  const dec = rad2deg(Math.asin(sinDec));

  const y =
    Math.sin(lonRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
  const x = Math.cos(lonRad);
  const ra = rad2deg(Math.atan2(y, x));

  return { ra: (ra + 360) % 360, dec };
}

export function moonPhase(date: Date) {
  const synodicMonth = 29.53058867;

  const d = (date.getTime() - Date.UTC(2000, 0, 6, 18)) / 86400000;

  const phase = (d % synodicMonth) / synodicMonth;

  return phase; // 0 → nouvelle lune, 0.5 → pleine lune
}

export function moonIllumination(date: Date): number {
  const moon = moonEquatorialPosition(date);
  const sun = sunEquatorialPosition(date);

  const raM = (moon.ra * Math.PI) / 180;
  const decM = (moon.dec * Math.PI) / 180;

  const raS = (sun.ra * Math.PI) / 180;
  const decS = (sun.dec * Math.PI) / 180;

  const cosPsi =
    Math.sin(decS) * Math.sin(decM) +
    Math.cos(decS) * Math.cos(decM) * Math.cos(raS - raM);

  const illumination = (1 - cosPsi) / 2;

  return illumination;
}

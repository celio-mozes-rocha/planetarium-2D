import { DEG2RAD, RAD2DEG } from "./constants";

// --- Conversion équatorial →  horizontal ---
export function equatorialToHorizontal(
  ra: number,
  dec: number,
  lat: number,
  lst: number,
) {
  const H = (lst - ra) * DEG2RAD;
  const decRad = dec * DEG2RAD;
  const latRad = lat * DEG2RAD;

  const sinAlt =
    Math.sin(decRad) * Math.sin(latRad) +
    Math.cos(decRad) * Math.cos(latRad) * Math.cos(H);

  const alt = Math.asin(sinAlt);

  const cosAz =
    (Math.sin(decRad) - Math.sin(alt) * Math.sin(latRad)) /
    (Math.cos(alt) * Math.cos(latRad));

  let az = Math.acos(Math.max(-1, Math.min(1, cosAz)));

  if (Math.sin(H) > 0) az = 2 * Math.PI - az;

  return {
    az: az * RAD2DEG,
    alt: alt * RAD2DEG,
  };
}

// --- Conversion horizontal → équatorial ---
export function horizToEquatorial(
  azDeg: number,
  altDeg: number,
  latDeg: number,
  lstDeg: number,
) {
  const az = azDeg * DEG2RAD;
  const alt = altDeg * DEG2RAD;
  const lat = latDeg * DEG2RAD;

  const sinDec =
    Math.sin(lat) * Math.sin(alt) +
    Math.cos(lat) * Math.cos(alt) * Math.cos(az);
  const dec = Math.asin(sinDec);

  const H = Math.atan2(
    -Math.sin(az) * Math.cos(alt),
    Math.cos(lat) * Math.sin(alt) -
      Math.sin(lat) * Math.cos(alt) * Math.cos(az),
  );

  const ra = (lstDeg - H / DEG2RAD + 360) % 360;
  return { ra, dec: dec / DEG2RAD };
}

export function horizToVector(
  az: number,
  alt: number,
): [number, number, number] {
  const azRad = az * DEG2RAD;
  const altRad = alt * DEG2RAD;

  return [
    Math.cos(altRad) * Math.sin(azRad),
    Math.sin(altRad),
    Math.cos(altRad) * Math.cos(azRad),
  ];
}

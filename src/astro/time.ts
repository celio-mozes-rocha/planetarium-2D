// fonctions de temps

// calculer le décalage UTC
// ------------------------
export function formatUTCOffset(date: Date, timeZone: string) {
  const formateer = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
  });

  const parts = formateer.formatToParts(date);
  const offsetParts = parts.find((p) => p.type === "timeZoneName");

  if (!offsetParts) return "UTC";

  return offsetParts.value.replace("GMT", "UTC");
}

// Greenwich Mean Sidereal Time (GMST)
// -----------------------------------
export function gmst(jd: number): number {
  const T = (jd - 2451545.0) / 36525.0;

  let theta =
    280.46061837 +
    360.98564736629 * (jd - 2451545) +
    0.000387933 * T * T -
    (T * T * T) / 38710000;

  return ((theta % 360) + 360) % 360; // degrés
}

// date julienne
// -------------
export function julianDate(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

// conversion  temps sidéral local (LST) -> heures
export function lstInHours(lstDeg: number): number {
  return lstDeg / 15;
}

// calcul du LST
//--------------
export function localSiderealTime(
  date: Date,
  longitude: number, // degrés Est +
): number {
  const jd = julianDate(date);
  const gst = gmst(jd);
  const lst = gst + longitude;
  return ((lst % 360) + 360) % 360;
}

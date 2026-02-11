export function sunEquatorialPosition(date: Date) {
  const rad = Math.PI / 180;

  // jours depuis J2000
  const dayAfter2k = date.getTime() / 86400000 + 2440587.5;
  const n = dayAfter2k - 2451545.0;

  // longitude moyenne
  const avgLongitude = (280.46 + 0.9856474 * n) % 360;

  // anomalie moyenne
  const g = (357.528 + 0.9856003 * n) % 360;

  // longitude écliptique
  const lambda =
    avgLongitude + 1.915 * Math.sin(g * rad) + 0.02 * Math.sin(2 * g * rad);

  // obliquité
  const epsilon = 23.439 - 0.0000004 * n;

  // conversion écliptique → équatorial
  const ra =
    Math.atan2(
      Math.cos(epsilon * rad) * Math.sin(lambda * rad),
      Math.cos(lambda * rad),
    ) / rad;

  const dec = Math.asin(Math.sin(epsilon * rad) * Math.sin(lambda * rad)) / rad;

  return {
    ra: (ra + 360) % 360, // en degrés
    dec,
  };
}

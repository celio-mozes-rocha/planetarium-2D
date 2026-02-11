export function unwrapRaPolygon(
  points: [number, number][],
): [number, number][] {
  if (points.length === 0) return points;

  const result: [number, number][] = [];
  let prevRa = points[0][0];
  let offset = 0;

  result.push([prevRa, points[0][1]]);

  for (let i = 1; i < points.length; i++) {
    let ra = points[i][0];
    const dec = points[i][1];

    let delta = ra - prevRa;

    if (delta > 180) offset -= 360;
    else if (delta < -180) offset += 360;

    const raUnwrapped = ra + offset;
    result.push([raUnwrapped, dec]);

    prevRa = ra;
  }

  return result;
}

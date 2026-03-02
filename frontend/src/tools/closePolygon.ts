export function closePolygon(points: number[][]) {
  if (points.length < 2) return points;

  const [x0, y0] = points[0];
  const [x1, y1] = points[points.length - 1];

  if (x0 !== x1 || y0 !== y1) {
    return [...points, points[0]];
  }

  return points;
}

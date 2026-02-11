import { RAD2DEG } from "../astro/constants";
import { raDecToVector } from "../astro/rotate";

export function polygonCentroid(points: number[][]) {
  let sx = 0,
    sy = 0,
    sz = 0;

  for (const [ra, dec] of points) {
    const [x, y, z] = raDecToVector(ra, dec);
    sx += x;
    sy += y;
    sz += z;
  }

  const norm = Math.sqrt(sx * sx + sy * sy + sz * sz);
  if (norm === 0) return null;

  sx /= norm;
  sy /= norm;
  sz /= norm;

  const dec = Math.asin(sz) * RAD2DEG;
  let ra = Math.atan2(sy, sx) * RAD2DEG;
  if (ra < 0) ra += 360;

  return { ra, dec };
}

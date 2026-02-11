// --- Constellations ---

import { equatorialToHorizontal } from "../astro/coordinates";
import { projectHorizontal } from "../astro/projection";
import constellationSegments from "../data/constellation_segments.json";
import starsData from "../data/stars.json";
import type { StarType } from "../types/StarType";

const starByHip = new Map<number, StarType>();
starsData.forEach((s: StarType) => starByHip.set(s.hip, s));

export default function drawConstellations(
  ctx: CanvasRenderingContext2D,
  lat: number,
  lst: number,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(100,150,255,0.6)";

  for (const segments of Object.values(constellationSegments)) {
    for (const [hipA, hipB] of segments) {
      const A = starByHip.get(hipA);
      const B = starByHip.get(hipB);
      if (!A || !B) continue;

      const hA = equatorialToHorizontal(A.ra, A.dec, lat, lst);
      const hB = equatorialToHorizontal(B.ra, B.dec, lat, lst);

      const p1 = projectHorizontal(hA.az, hA.alt, camAz, camAlt, W, H, scale);

      const p2 = projectHorizontal(hB.az, hB.alt, camAz, camAlt, W, H, scale);

      if (
        !Number.isFinite(p1.x) ||
        !Number.isFinite(p1.y) ||
        !Number.isFinite(p2.x) ||
        !Number.isFinite(p2.y)
      )
        continue;

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    }
  }
  ctx.restore();
}

import { projectHorizontal } from "../astro/projection";

export function buildHorizonPolygon(
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  const pts: { x: number; y: number }[] = [];
  const steps = 360;

  for (let i = 0; i <= steps; i++) {
    const az = (i / steps) * 360;
    const p = projectHorizontal(az, 0, camAz, camAlt, W, H, scale);
    if (Number.isFinite(p.x) && Number.isFinite(p.y)) {
      pts.push({ x: p.x, y: p.y });
    }
  }
  return pts;
}

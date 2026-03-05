import { projectHorizontal } from "../astro/projection";

export function buildHorizonPath(
  ctx: CanvasRenderingContext2D,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  const steps = 360;
  let first = true;

  ctx.beginPath();

  for (let i = 0; i <= steps; i++) {
    const az = (i / steps) * 360;
    const p = projectHorizontal(az, 0, camAz, camAlt, W, H, scale);
    if (!p) continue;

    if (first) {
      ctx.moveTo(p.x!, p.y!);
      first = false;
    } else {
      ctx.lineTo(p.x!, p.y!);
    }
  }

  ctx.closePath();
}

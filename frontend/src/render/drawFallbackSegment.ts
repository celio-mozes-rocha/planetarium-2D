import { equatorialToHorizontal } from "../astro/coordinates";
import { projectHorizontal } from "../astro/projection";

export function drawFallbackSegment(
  ctx: CanvasRenderingContext2D,
  a: [number, number],
  b: [number, number],
  lat: number,
  lst: number,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  const steps = 10;
  let lastVisible = false;
  ctx.beginPath();

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ra = a[0] + (b[0] - a[0]) * t;
    const dec = a[1] + (b[1] - a[1]) * t;

    const { az, alt } = equatorialToHorizontal(ra, dec, lat, lst);
    const p = projectHorizontal(az, alt, camAz, camAlt, W, H, scale);

    if (p.x !== null && p.y !== null) {
      if (!lastVisible) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
      lastVisible = true;
    } else lastVisible = false;
  }

  ctx.stroke();
}

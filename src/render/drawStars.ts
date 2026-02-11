import type { StarType } from "../types/StarType";
import { equatorialToHorizontal } from "../astro/coordinates";
import { projectHorizontal } from "../astro/projection";

export function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: StarType[],
  lat: number,
  lst: number,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  ctx.save();

  for (const star of stars) {
    const h = equatorialToHorizontal(star.ra, star.dec, lat, lst);
    const p = projectHorizontal(h.az, h.alt, camAz, camAlt, W, H, scale);

    if (!Number.isFinite(p.x) || !Number.isFinite(p.y)) continue;

    // Sous l’horizon
    //if (h.alt <= 0) continue;

    // Magnitude → rendu visuel
    const radius = Math.max(0.7, 3.2 - star.mag * 0.5);
    const alpha = Math.min(1, Math.max(0.15, 1.1 - star.mag * 0.08));

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    //ctx.fillStyle = `rgba(255,255,255,0.8)`;
    //ctx.shadowBlur = radius * 2;
    ctx.shadowColor = "white";
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

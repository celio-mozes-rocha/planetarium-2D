import { equatorialToHorizontal } from "../astro/coordinates";
import { projectHorizontal } from "../astro/projection";

// --- Grille équatoriale ---
export default function drawEquatorialGrid(
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
  ctx.strokeStyle = "rgba(255,255,255,0.15)";
  ctx.lineWidth = 1;

  const steps = 360;
  // Déclinaison
  for (let dec = -80; dec <= 80; dec += 10) {
    let lastVisible = false;
    ctx.beginPath();
    for (let i = 0; i <= steps; i++) {
      const ra = (i / steps) * 360;
      const { az, alt } = equatorialToHorizontal(ra, dec, lat, lst);
      const p = projectHorizontal(az, alt, camAz, camAlt, W, H, scale);
      if (Number.isFinite(p.x) && Number.isFinite(p.y)) {
        if (!lastVisible) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
        lastVisible = true;
      } else lastVisible = false;
    }
    ctx.stroke();
  }

  // Ascension droite
  for (let ra0 = 0; ra0 < 360; ra0 += 20) {
    let lastVisible = false;
    ctx.beginPath();

    for (let dec = -90; dec <= 90; dec += 1) {
      const { az, alt } = equatorialToHorizontal(ra0, dec, lat, lst);
      const p = projectHorizontal(az, alt, camAz, camAlt, W, H, scale);
      if (Number.isFinite(p.x) && Number.isFinite(p.y)) {
        if (!lastVisible) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
        lastVisible = true;
      } else {
        lastVisible = false;
      }
    }
    ctx.stroke();
  }
  ctx.restore();
}

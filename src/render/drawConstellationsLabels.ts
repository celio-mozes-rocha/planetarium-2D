import { CONSTELLATIONS } from "../data/constellations";
import { equatorialToHorizontal } from "../astro/coordinates";
import { projectHorizontal } from "../astro/projection";
import type { HitTargetType } from "../types/HitTargetType";

export default function drawConstellationsLabels(
  ctx: CanvasRenderingContext2D,
  lat: number,
  lst: number,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
  hitTargets: HitTargetType[],
) {
  ctx.save();
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "lime";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  CONSTELLATIONS.forEach(({ code, nameFr, center }) => {
    const h = equatorialToHorizontal(center.ra, center.dec, lat, lst);
    const p = projectHorizontal(h.az, h.alt, camAz, camAlt, W, H, scale);

    if (!p) {
      ctx.restore();
      return;
    }

    // cercle du ciel

    ctx.beginPath();

    ctx.fillText(nameFr, p.x, p.y);

    // mise en mémoire des labels pour identifier la constellation à afficher au clic souris
    hitTargets.push({
      code: code,
      objectType: "constellation",
      x: p.x,
      y: p.y,
      r: 20,
    });
  });
  ctx.restore;
}

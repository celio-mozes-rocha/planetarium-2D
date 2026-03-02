import { equatorialToHorizontal } from "../astro/coordinates";
import { projectHorizontal } from "../astro/projection";
import { getScreenRadius } from "../tools/getScreenRadius";
import type { HitTargetType } from "../types/HitTargetType";
import type { SolarSystemObjectType } from "../types/SolarSystemObjectType";

export function drawSolarSystemLabels(
  ctx: CanvasRenderingContext2D,
  objects: SolarSystemObjectType[],
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

  ctx.font = "14px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffffff";

  for (const solarObject of objects) {
    const h = equatorialToHorizontal(solarObject.ra, solarObject.dec, lat, lst);
    const p = projectHorizontal(h.az, h.alt, camAz, camAlt, W, H, scale);

    if (!p) continue;

    // Affichage du label légèrement décalé
    const r = Math.max(4, scale * (solarObject.angularRadius / 8));
    const offset = r + 8;

    ctx.fillText(solarObject.name, p.x + offset, p.y - offset);

    // Ajout dans la zone cliquable

    hitTargets.push({
      code: solarObject.code,
      objectType: "solar-system",
      x: p.x,
      y: p.y,
      r: getScreenRadius(solarObject, scale),
      solarObject,
    });
  }
  ctx.restore();
}

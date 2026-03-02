import { equatorialToHorizontal } from "../astro/coordinates";
import { projectHorizontal } from "../astro/projection";
import type { SolarSystemObjectType } from "../types/SolarSystemObjectType";
//import { sunEquatorialPosition } from "../astro/sun";

export function drawSun(
  ctx: CanvasRenderingContext2D,
  object: SolarSystemObjectType,
  lat: number,
  lst: number,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  const { ra, dec } = object;
  const h = equatorialToHorizontal(ra, dec, lat, lst);
  const p = projectHorizontal(h.az, h.alt, camAz, camAlt, W, H, scale);

  // couleur de base du soleil : jaune clair
  const [R, G, B] = [255, 245, 180];

  if (!p || !Number.isFinite(p.x) || !Number.isFinite(p.y)) return;

  // Option pour ne pas déssiner le soleil sous l’horizon
  // if (h.alt < -2) return;

  ctx.save();

  // Taille angulaire proche du réalisme
  const sunAngularRadius = 0.265; // degrés
  const rayOfSun = Math.max(4, scale * (sunAngularRadius / 8));

  // --- halo ---
  const gradient = ctx.createRadialGradient(
    p.x,
    p.y,
    rayOfSun * 0.3,
    p.x,
    p.y,
    rayOfSun * 4,
  );

  gradient.addColorStop(0, `rgba(${R}, ${G}, ${B}, 0.9)`);
  gradient.addColorStop(0.2, `rgba(${R}, ${G}, ${B}, 0.4)`);
  gradient.addColorStop(0.6, `rgba(${R}, ${G}, ${B}, 0.1)`);
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(p.x, p.y, rayOfSun * 4, 0, Math.PI * 2);
  ctx.fill();

  // --- disque central ---
  const diskGradient = ctx.createRadialGradient(
    p.x,
    p.y,
    0,
    p.x,
    p.y,
    rayOfSun,
  );

  diskGradient.addColorStop(0, "white");
  diskGradient.addColorStop(0.6, `rgb(${R}, ${G}, ${B})`);
  diskGradient.addColorStop(1, `rgb(${R - 20}, ${G - 20}, ${B - 20})`);

  ctx.fillStyle = diskGradient;
  ctx.beginPath();
  ctx.arc(p.x, p.y, rayOfSun, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

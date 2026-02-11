//import { moonEquatorialPosition, moonIllumination } from "../astro/moon";
//import { sunEquatorialPosition } from "../astro/sun";
import { equatorialToHorizontal } from "../astro/coordinates";
import { moonIllumination } from "../astro/moon";
import { projectHorizontal } from "../astro/projection";
import { sunEquatorialPosition } from "../astro/sun";
import { drawHalfCircle, drawHalfEllipse } from "../tools/coniques";
import type { SolarSystemObjectType } from "../types/SolarSystemObjectType";

export function drawMoon(
  ctx: CanvasRenderingContext2D,
  date: Date,
  object: SolarSystemObjectType,
  lat: number,
  lst: number,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
  onIllumination?: (v: number) => void,
) {
  //const moon = moonEquatorialPosition(date);
  const sun = sunEquatorialPosition(date);

  const { ra, dec } = object;

  const h = equatorialToHorizontal(ra, dec, lat, lst);
  const p = projectHorizontal(h.az, h.alt, camAz, camAlt, W, H, scale);

  // --- couleurs des phases ---
  const LIGHT = "#e6e6f0";
  const DARK = "#1c1c24";

  if (!p) return;

  const illumination = moonIllumination(date);

  if (onIllumination) {
    onIllumination(illumination);
  }

  const moonAngularRadius = 0.26;
  const r = Math.max(4, scale * (moonAngularRadius / 8));

  // --- Halo ---
  const glow = ctx.createRadialGradient(p.x, p.y, r * 0.2, p.x, p.y, r * 2.5);
  glow.addColorStop(0, "rgba(200,200,255,0.3)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(p.x, p.y, r * 2.5, 0, Math.PI * 2);
  ctx.fill();

  // --- Orientation par rapport au soleil ---
  const sunH = equatorialToHorizontal(sun.ra, sun.dec, lat, lst);
  const sunP = projectHorizontal(sunH.az, sunH.alt, camAz, camAlt, W, H, scale);
  if (!sunP) return;

  const angle = Math.atan2(sunP.y - p.y, sunP.x - p.x);

  const phaseAngle = (ra - sun.ra + 360) % 360;

  // coefficient de phase contenu sur [-1 → 1]
  const k = 1 - 2 * illumination;

  //const isWaxing = phaseAngle < 180;
  const e = Math.abs(k) * r;

  //ctx.imageSmoothingEnabled = false;

  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(angle);

  //const moonPattern = createMoonTexture(ctx);

  // Base : disque entier sombre
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = DARK;
  ctx.fill();
  // --- demi-cercle éclairé
  drawHalfCircle(ctx, r, true, LIGHT); // droite

  // texture

  // Masque anti-aliasing sur l'axe central
  ctx.beginPath();
  ctx.moveTo(0, -r + 1);
  ctx.lineTo(0, r - 1);
  ctx.lineWidth = Math.max(1, r * 0.09);
  ctx.lineCap = "butt";
  ctx.strokeStyle = illumination < 0.484 ? DARK : LIGHT;
  ctx.stroke();

  // --- Gestion des phases ---
  if (phaseAngle < 180) {
    // de nouvelle à pleine lune
    if (phaseAngle <= 90) {
      drawHalfEllipse(ctx, e, r, -Math.PI / 2, Math.PI / 2, DARK);
    } else {
      drawHalfEllipse(ctx, e, r, Math.PI / 2, -Math.PI / 2, LIGHT);
    }
  } else {
    // de pleine à nouvelle lune
    if (phaseAngle < 270) {
      drawHalfEllipse(ctx, e, r, Math.PI / 2, -Math.PI / 2, LIGHT);
    } else {
      drawHalfEllipse(ctx, e, r, -Math.PI / 2, Math.PI / 2, DARK);
    }
  }
  ctx.restore();
}

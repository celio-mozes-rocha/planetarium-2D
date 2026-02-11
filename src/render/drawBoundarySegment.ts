import { equatorialToHorizontal } from "../astro/coordinates";
import { projectHorizontal } from "../astro/projection";
import { drawFallbackSegment } from "./drawFallbackSegment";

const EPS_RA = 0.05; // degrés
const EPS_DEC = 0.05;

function isMeridian(a: [number, number], b: [number, number]) {
  let dra = Math.abs(a[0] - b[0]);
  if (dra > 180) dra = 360 - dra; // wrap RA
  return dra < EPS_RA;
}

function isParallel(a: [number, number], b: [number, number]) {
  return Math.abs(a[1] - b[1]) < EPS_DEC;
}

export function drawBoundarySegment(
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
  doStroke = true,
) {
  const steps = 60;
  let started = false;

  const addPoint = (ra: number, dec: number) => {
    const { az, alt } = equatorialToHorizontal(ra, dec, lat, lst);
    const p = projectHorizontal(az, alt, camAz, camAlt, W, H, scale);
    if (!p) {
      started = false;
      return;
    }
    if (!started) {
      ctx.moveTo(p.x, p.y);
      started = true;
    } else {
      ctx.lineTo(p.x, p.y);
    }
  };

  //parallele
  if (isParallel(a, b)) {
    const dec = (a[1] + b[1]) * 0.5;

    let dra = b[0] - a[0];

    if (Math.abs(dra) > 180) dra += dra > 0 ? -360 : 360;

    for (let i = 0; i <= steps; i++) {
      addPoint(a[0] + dra * (i / steps), dec);
    }
  }

  // méridien
  else if (isMeridian(a, b)) {
    const ra = (a[0] + b[0]) * 0.5;
    for (let i = 0; i <= steps; i++) {
      addPoint(ra, a[1] + (b[1] - a[1]) * (i / steps));
    }
  }

  if (doStroke) ctx.stroke();

  // --- fallback ---
  drawFallbackSegment(ctx, a, b, lat, lst, camAz, camAlt, W, H, scale);
  return;
}

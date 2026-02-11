import { CONSTELLATIONS } from "../data/constellations";
import { drawBoundarySegment } from "./drawBoundarySegment";

// fonction de remplissage qui ne fonctionne pas
export function drawSelectedConstellation(
  ctx: CanvasRenderingContext2D,
  selectedConstellation: string,
  lat: number,
  lst: number,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  ctx.save();
  const selected = CONSTELLATIONS.find((c) => c.code === selectedConstellation);

  if (selected) {
    // --- remplissage ---
    ctx.fillStyle = "rgba(80,120,255,0.15)"; // transparent
    ctx.beginPath();

    for (let i = 0; i < selected.points.length; i++) {
      const a = selected.points[i];
      const b = selected.points[(i + 1) % selected.points.length];
      drawBoundarySegment(ctx, a, b, lat, lst, camAz, camAlt, W, H, scale);
    }

    ctx.closePath();
    ctx.fill();

    // --- contour ---
    ctx.strokeStyle = "rgba(100,200,255,0.8)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([]);
    for (let i = 0; i < selected.points.length; i++) {
      const a = selected.points[i];
      const b = selected.points[(i + 1) % selected.points.length];
      drawBoundarySegment(ctx, a, b, lat, lst, camAz, camAlt, W, H, scale);
    }
  }
  ctx.restore();
}

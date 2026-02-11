import { buildHorizonPath } from "../tools/builtHorizonPath";

// --- Cercle d'horizon ---
export default function drawHorizon(
  ctx: CanvasRenderingContext2D,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,100,100,0.7)";
  ctx.lineWidth = 1.1;

  buildHorizonPath(ctx, camAz, camAlt, W, H, scale);
  ctx.stroke();

  ctx.restore();
}

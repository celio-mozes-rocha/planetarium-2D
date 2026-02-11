// dessiner le sol simple

import { buildHorizonPolygon } from "../tools/builHorizonPolygon";

export default function drawGround(
  ctx: CanvasRenderingContext2D,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  const horizon = buildHorizonPolygon(camAz, camAlt, W, H, scale);
  if (horizon.length < 3) return;

  ctx.save();
  ctx.fillStyle = "#180501"; // sable opaque
  ctx.globalAlpha = 1;

  ctx.beginPath();

  if (camAlt >= 0) {
    // 🔼 Regarde le ciel → sol à l’extérieur
    ctx.moveTo(0, 0);
    ctx.lineTo(W, 0);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
  }

  // polygone de l’horizon
  ctx.moveTo(horizon[0].x, horizon[0].y);
  for (let i = 1; i < horizon.length; i++) {
    ctx.lineTo(horizon[i].x, horizon[i].y);
  }
  ctx.closePath();

  ctx.fill(camAlt >= 0 ? "evenodd" : "nonzero");
  ctx.restore();
}

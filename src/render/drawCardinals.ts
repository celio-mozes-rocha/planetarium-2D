// draw cardinals
import { projectHorizontal } from "../astro/projection";
import drawHorizon from "./drawHorizon";

export default function drawCardinals(
  ctx: CanvasRenderingContext2D,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  //if (!drawCardinals) return;

  const cardinals = [
    { label: "N", az: 0 },
    { label: "NE", az: 45 },
    { label: "E", az: 90 },
    { label: "SE", az: 135 },
    { label: "S", az: 180 },
    { label: "SO", az: 225 },
    { label: "O", az: 270 },
    { label: "NO", az: 315 },
  ];
  ctx.save();
  ctx.fillStyle = "orange";
  for (const c of cardinals) {
    const p = projectHorizontal(c.az, 0, camAz, camAlt, W, H, scale);
    if (p) {
      if (c.az % 2 === 0) {
        ctx.font = "26px sans-serif"; // police des points cardinaux principaux (0/90/180/270)
        ctx.fillText(c.label, p.x! - 8, p.y! - 8);
      } else {
        ctx.font = "16px sans-serif"; // police des points cardinaux secondaires (45/135/225/315)
        ctx.fillText(c.label, p.x! - 8, p.y! - 8);
      }
    }
  }

  // ligne d'horizon
  drawHorizon(ctx, camAz, camAlt, W, H, scale);
  ctx.restore();
}

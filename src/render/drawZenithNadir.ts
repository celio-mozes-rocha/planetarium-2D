import { projectHorizontal } from "../astro/projection";

export default function drawZenithNadir(
  ctx: CanvasRenderingContext2D,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  // --- Zénith ---
  ctx.save();
  {
    const p = projectHorizontal(0, 90, camAz, camAlt, W, H, scale);
    if (p.x && p.y) {
      ctx.fillStyle = "red";
      ctx.font = "20px sans-serif";
      ctx.fillText("Z", p.x - 6, p.y - 6);
    }
  }

  // --- Nadir ---
  {
    const p = projectHorizontal(0, -90, camAz, camAlt, W, H, scale);
    if (p.x && p.y) {
      ctx.fillStyle = "red";
      ctx.font = "20px sans-serif";
      ctx.fillText("Na", p.x - 8, p.y - 8);
    }
  }
  ctx.restore();
}

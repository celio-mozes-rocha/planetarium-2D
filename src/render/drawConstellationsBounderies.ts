// projeter les limites des constellations

import { CONSTELLATIONS } from "../data/constellations";
import { drawBoundarySegment } from "./drawBoundarySegment";

export default function drawConstellationsBounderies(
  ctx: CanvasRenderingContext2D,
  lat: number,
  lst: number,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
) {
  // --- Stroke ---
  //ctx.save();
  ctx.strokeStyle = "rgba(180,180,255,0.4)";
  ctx.setLineDash([1, 4]);

  CONSTELLATIONS.forEach(({ points }) => {
    for (let i = 0; i < points.length - 1; i++) {
      drawBoundarySegment(
        ctx,
        points[i],
        points[i + 1],
        lat,
        lst,
        camAz,
        camAlt,
        W,
        H,
        scale,
      );
    }
  });
  ctx.restore();
}

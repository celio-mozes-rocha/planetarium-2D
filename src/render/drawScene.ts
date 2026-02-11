import { drawStars } from "./drawStars";
import drawConstellations from "./drawConstellations";
import drawEquatorialGrid from "./drawEquatorialGrid";
import drawConstellationsBounderies from "./drawConstellationsBounderies";
import drawConstellationsLabels from "./drawConstellationsLabels";
import drawZenithNadir from "./drawZenithNadir";
import drawHorizon from "./drawHorizon";
import drawCardinals from "./drawCardinals";
import drawGround from "./drawGround";
import type { RenderContextType } from "../types/RenderContextType";
import { drawSelectedConstellation } from "./drawSelectedConstellation";
import { computeSolarSystemObjects } from "../astro/computeSolarObjects";
import { drawSolarSystemObjects } from "./drawSolarSystemObjects";
import { drawSolarSystemLabels } from "./drawSolarSystemLabels";

export function drawScene(rc: RenderContextType) {
  const {
    ctx,
    date,
    W,
    H,
    lat,
    lon,
    lst,
    camAz,
    camAlt,
    scale,
    showGround,
    showDrawCardinals,
    showEquatorialGrid,
    showConstellations,
    showSelectedConstellation,
    showBoundaries,
    showLabels,
    hitTargets,
    starsData,
    setMoonIllumination,
  } = rc;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, W, H);

  const solarObjects = computeSolarSystemObjects(date, lat, lon);

  drawSolarSystemObjects(
    ctx,
    date,
    solarObjects,
    lat,
    lst,
    camAz,
    camAlt,
    W,
    H,
    scale,
    setMoonIllumination,
  );

  drawStars(ctx, starsData, lat, lst, camAz, camAlt, W, H, scale);

  drawSolarSystemLabels(
    ctx,
    solarObjects,
    lat,
    lst,
    camAz,
    camAlt,
    W,
    H,
    scale,
    hitTargets,
  );

  if (showEquatorialGrid) {
    drawEquatorialGrid(ctx, lat, lst, camAz, camAlt, W, H, scale);
  }

  if (showLabels) {
    drawConstellationsLabels(
      ctx,
      lat,
      lst,
      camAz,
      camAlt,
      W,
      H,
      scale,
      hitTargets,
    );
  }

  // --- ciel

  if (showConstellations) {
    drawConstellations(ctx, lat, lst, camAz, camAlt, W, H, scale);
  }

  if (showBoundaries) {
    drawConstellationsBounderies(ctx, lat, lst, camAz, camAlt, W, H, scale);
  }

  // afficher la constellation selectionnée
  if (showSelectedConstellation !== null) {
    drawSelectedConstellation(
      ctx,
      showSelectedConstellation,
      lat,
      lst,
      camAz,
      camAlt,
      W,
      H,
      scale,
    );
  }

  if (drawZenithNadir) {
    drawZenithNadir(ctx, camAz, camAlt, W, H, scale);
  }

  // --- sol
  if (showGround) {
    drawGround(ctx, camAz, camAlt, W, H, scale);
  }

  // --- overlay
  if (showGround) {
    drawHorizon(ctx, camAz, camAlt, W, H, scale);
  }
  if (showDrawCardinals) {
    drawCardinals(ctx, camAz, camAlt, W, H, scale);
  }
}

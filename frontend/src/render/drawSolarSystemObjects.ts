import type { SolarSystemObjectType } from "../types/SolarSystemObjectType";
import { drawMoon } from "./drawMoon";
import { drawSun } from "./drawSun";

export function drawSolarSystemObjects(
  ctx: CanvasRenderingContext2D,
  date: Date,
  solarObjects: SolarSystemObjectType[],
  lat: number,
  lst: number,
  camAz: number,
  camAlt: number,
  W: number,
  H: number,
  scale: number,
  setMoonIllumination: (v: number) => void,
) {
  // soleil

  for (const object of solarObjects) {
    switch (object.type) {
      case "moon":
        drawMoon(
          ctx,
          date,
          object,
          lat,
          lst,
          camAz,
          camAlt,
          W,
          H,
          scale,
          setMoonIllumination,
        );
        break;

      case "sun":
        drawSun(ctx, object, lat, lst, camAz, camAlt, W, H, scale);
        break;
    }
  }
}

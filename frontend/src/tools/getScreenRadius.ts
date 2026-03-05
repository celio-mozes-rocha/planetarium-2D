import type { SolarSystemObjectType } from "../types/SolarSystemObjectType";

export function getScreenRadius(obj: SolarSystemObjectType, scale: number) {
  return Math.max(4, scale * (obj.angularRadius / 8));
}

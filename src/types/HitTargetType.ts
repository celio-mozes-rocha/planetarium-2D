import type { SolarSystemObjectType } from "./SolarSystemObjectType";

export type HitTargetType = {
  code: string;
  objectType: "constellation" | "solar-system" | "star";
  x: number;
  y: number;
  r: number;
  solarObject?: SolarSystemObjectType;
};

import { DEG2RAD } from "./constants";
import { rotateVector } from "./rotate";
import type { ProjectedPointType } from "../types/ProtectedPointType";

export function projectHorizontal(
  az: number,
  alt: number,
  camAz: number,
  camAlt: number,
  width: number,
  height: number,
  scale: number,
): ProjectedPointType {
  const azRad = az * DEG2RAD;
  const altRad = alt * DEG2RAD;

  // --- vecteur unité direction du point ---
  const v: [number, number, number] = [
    Math.cos(altRad) * Math.sin(azRad),
    Math.sin(altRad),
    Math.cos(altRad) * Math.cos(azRad),
  ];

  // --- rotation caméra (sens inverse du regard) ---
  const [xr, yr, zr] = rotateVector(v, camAz, camAlt);

  const k = scale / (1 + zr);

  const sx = width / 2 + xr * k;
  const sy = height / 2 - yr * k;

  return {
    x: sx,
    y: sy,
    zr: zr,
  };
}

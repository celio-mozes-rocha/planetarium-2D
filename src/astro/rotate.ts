export type Vec3 = [number, number, number];
import { DEG2RAD } from "./constants";

export function rotateVector(v: Vec3, yawDeg: number, pitchDeg: number): Vec3 {
  const yaw = yawDeg * DEG2RAD;
  const pitch = pitchDeg * DEG2RAD;

  // --- Rotation autour de l’axe Y (azimut) ---
  const x1 = v[0] * Math.cos(yaw) - v[2] * Math.sin(yaw);
  const y1 = v[1];
  const z1 = v[0] * Math.sin(yaw) + v[2] * Math.cos(yaw);

  // --- Rotation autour de l’axe X (hauteur) ---
  const x2 = x1;
  const y2 = y1 * Math.cos(pitch) - z1 * Math.sin(pitch);
  const z2 = y1 * Math.sin(pitch) + z1 * Math.cos(pitch);

  return [x2, y2, z2];
}

export function raDecToVector(
  ra: number,
  dec: number,
): [number, number, number] {
  const raRad = ra * DEG2RAD;
  const decRad = dec * DEG2RAD;

  return [
    Math.cos(decRad) * Math.cos(raRad),
    Math.cos(decRad) * Math.sin(raRad),
    Math.sin(decRad),
  ];
}

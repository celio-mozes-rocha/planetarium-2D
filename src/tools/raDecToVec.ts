import { DEG2RAD } from "../astro/constants";

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

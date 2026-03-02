import type { HitTargetType } from "../types/HitTargetType";

export function findClickedObject(
  x: number,
  y: number,
  objects: HitTargetType[],
): HitTargetType | null {
  for (const obj of objects) {
    const dx = x - obj.x;
    const dy = y - obj.y;

    if (dx * dx + dy * dy <= obj.r * obj.r) {
      return obj;
    }
  }
  return null;
}

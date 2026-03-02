import type { HitTargetType } from "../types/HitTargetType";

export function getObjectUnderCursor(
  mouseX: number,
  mouseY: number,
  hitTargets: HitTargetType[],
): HitTargetType | null {
  for (const target of hitTargets) {
    const dx = mouseX - target.x;
    const dy = mouseY - target.y;
    const r = target.r;

    if (dx * dx + dy * dy < r * r) {
      return target;
    }
  }
  return null;
}

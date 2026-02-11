import type { TooltipStateType } from "../types/TooltipStateType";

export default function MenuTooltip({
  tooltip,
  anchorRef,
}: {
  tooltip: TooltipStateType;
  anchorRef: React.RefObject<HTMLDivElement | null>;
}) {
  if (!tooltip || !anchorRef.current) return null;

  const rect = anchorRef.current.getBoundingClientRect();

  return (
    <div
      className="
        fixed z-50
        px-2 py-1 text-sm
        rounded-md
        text-white/90 shadow-lg
        pointer-events-none
        transition-opacity
      "
      style={{
        left: rect.left,
        top: rect.top - 32,
      }}
    >
      {tooltip.label}
      {tooltip.shortcut && (
        <span className="opacity-70 ml-2">
          [{tooltip.shortcut}]
        </span>
      )}
    </div>
  );
}

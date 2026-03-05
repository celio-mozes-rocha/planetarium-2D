import type { IconButtonPropsType } from "../types/IconButtonPropsType";

export function IconButton({
  active = false,
  children,
  tooltip,
  shortcut,
  onClick,
  setTooltip,
}: IconButtonPropsType) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={() =>
        setTooltip({ label: tooltip, shortcut })
      }
      onMouseLeave={() => setTooltip(null)}
      className={`
        p-1 rounded-md transition
        ${active
          ? "text-white bg-white/20"
          : "text-white/60 hover:text-white hover:bg-white/10"}
      `}
    >
      {children}
    </button>
  );
}


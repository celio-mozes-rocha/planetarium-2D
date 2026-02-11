import type { TooltipStateType } from "./TooltipStateType";

export type IconButtonPropsType = {
  active?: boolean;
  children: React.ReactNode;
  tooltip: string;
  shortcut?: string;
  onClick?: () => void;
  setTooltip: (t: TooltipStateType) => void;
};

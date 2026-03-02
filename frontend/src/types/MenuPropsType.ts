export type MenuPropsType = {
  // caméra
  camAz: number;
  camAlt: number;
  scale: number;

  // temps
  displayTime: Date;
  timeZone: string;
  displayFPS: number;
  fov: number;

  locationLabel: string;

  // états visuels
  showGround: boolean;
  showDrawCardinals: boolean;
  showEquatorialGrid: boolean;
  showConstellations: boolean;
  showLabels: boolean;
  showBoundaries: boolean;

  // actions (callbacks)
  onToggleGround: () => void;
  onToggleCardinals: () => void;
  onToggleEquatorialGrid: () => void;
  onToggleConstellations: () => void;
  onToggleLabels: () => void;
  onToggleBoundaries: () => void;

  onTimeFaster: () => void;
  onBackTimeFaster: () => void;
  onTimeNormal: () => void;
  onTimeNow: () => void;
  onSetTime: (date: Date) => void;
  onOpenLocationPopup: () => void;

  moonIllumination: number;
};

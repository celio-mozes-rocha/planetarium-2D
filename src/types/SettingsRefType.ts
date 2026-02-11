export type SettingsRefType = {
  camAz: number;
  camAlt: number;
  scale: number;

  lat: number;
  lon: number;

  showGround: boolean;
  showDrawCardinals: boolean;
  showEquatorialGrid: boolean;
  showConstellations: boolean;
  showBoundaries: boolean;
  showLabels: boolean;

  showSelectedConstellation: string | null;
};

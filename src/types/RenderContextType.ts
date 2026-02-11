import type { HitTargetType } from "./HitTargetType";

export type RenderContextType = {
  ctx: CanvasRenderingContext2D;
  W: number;
  H: number;

  // temps & position
  date: Date;
  lat: number;
  lon: number;
  lst: number;

  // caméra
  camAz: number;
  camAlt: number;
  scale: number;

  // options d’affichage
  showGround: boolean;
  showDrawCardinals: boolean;
  showEquatorialGrid: boolean;
  showConstellations: boolean;
  showSelectedConstellation: string | null;
  showBoundaries: boolean;
  showLabels: boolean;
  hitTargets: HitTargetType[];

  // données
  starsData: any;
  setMoonIllumination: (v: number) => void;
};

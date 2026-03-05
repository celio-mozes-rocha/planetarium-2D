export type SolarSystemObjectType = {
  code: string;
  name: string;
  ra: number;
  dec: number;
  type: "sun" | "moon" | "planet";
  angularRadius: number; //taille angulaire moyenne du rayon de l'object
  radius: number;
  riseTime?: Date | null;
  setTime?: Date | null;
};

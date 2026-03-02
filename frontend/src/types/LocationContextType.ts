export type CoordinatesType = {
  lat: number;
  lon: number;
  label: string;
  tz: string;
};

export type LocationContextType = {
  location: CoordinatesType;
  updateLocation: (lat: number, lon: number) => void;
};

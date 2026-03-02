export type RaDec = [number, number];

export type Segment = [number, number];

export type ConstellationType = {
  code: string;
  nameFr: string;
  nameEn: string;
  points: RaDec[];
  center: {
    ra: number;
    dec: number;
  };
};

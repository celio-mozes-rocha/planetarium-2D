import rawBoundaries from "./constellation_boundaries.json";
import { closePolygon } from "../tools/closePolygon";
import { polygonCentroid } from "../tools/PolygonCentroid";
import type { ConstellationType } from "../types/ConstellationType";
import { unwrapRaPolygon } from "../tools/unwrapRaPolygon";
import { CONSTELLATION_NAMES } from "../data/constellationsNames";

type RawBoundaries = Record<string, number[][]>;

const boundaries: RawBoundaries = rawBoundaries as RawBoundaries;

export const CONSTELLATIONS: ConstellationType[] = Object.entries(boundaries)
  .map(([code, rawPoints]) => {
    if (!Array.isArray(rawPoints) || rawPoints.length < 3) return null;

    const names = CONSTELLATION_NAMES[code as keyof typeof CONSTELLATION_NAMES];
    if (!names) {
      console.warn(`Nom manquant pour la constellation ${code}`);
      return null;
    }

    // --- fermeture du polygone ---
    const points = unwrapRaPolygon(
      closePolygon(rawPoints) as [number, number][],
    );

    // --- centroïde calculé sur les données sphériques ---
    const center = polygonCentroid(rawPoints);

    if (!center) return null;

    return {
      code,
      nameFr: names.fr,
      nameEn: names.en,
      points,
      center,
    };
  })
  .filter(Boolean) as ConstellationType[];

// constantes de conversion de degrés en radians et inversement
export const DEG2RAD = Math.PI / 180;
export const RAD2DEG = 180 / Math.PI;

// constantes de lever et coucher du soleil : altitude = 0°
export const RISE_SET_SUN = -0.833; // soleil. Altitude tenant compte de la réfraction + diamètre solaire
export const RISE_SET_MOON = -0.325; // lune. Altitude tenant compte de la réfraction + rayon de la lune

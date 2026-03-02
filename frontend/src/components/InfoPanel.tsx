import type { HitTargetType } from "../types/HitTargetType";

type Props = {
  object: HitTargetType | null
}
export default function InfoPanel({ object }: Props) {
  if (!object) return null;


  return (
    <>
      {/* Info panel : haut à droite*/}
      <div className="absolute top-10 left-4 bg-brown p-3 shadow-xl z-50 text-sm">
        <div className="font-semibold text-amber-300 text-xl">{object.solarObject?.name}</div>
        <div>Type: {object.solarObject?.type}</div>
        <div>RA: {object.solarObject?.ra.toFixed(1)}°</div>
        <div>Dec: {object.solarObject?.dec.toFixed(1)}°</div>
        {object.solarObject?.riseTime && (
          <div>Lever: {object.solarObject?.riseTime?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
        )}
        {object.solarObject?.setTime && (
          <div>Coucher: {object.solarObject?.setTime?.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
        )}
      </div>
    </>

  )
}
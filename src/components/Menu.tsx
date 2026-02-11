// Menu.tsx
import { RiLandscapeLine, RiCompass3Fill, } from "react-icons/ri";
import { RxGlobe, RxLetterCaseCapitalize, RxGroup, RxReset, RxColorWheel, } from "react-icons/rx";
import { VscSparkle } from "react-icons/vsc";
import { IoCalendarNumberOutline, IoEarth, IoPlayBackSharp, IoPlayForwardSharp, IoPlaySharp } from "react-icons/io5";
import { IconButton } from "./IconButton";
import { formatUTCOffset } from "../astro/time";
import type { MenuPropsType } from "../types/MenuPropsType";
import type { TooltipStateType } from "../types/TooltipStateType";
import { useEffect, useRef, useState } from "react";
import MenuTooltip from "./MenuTooltip";

export default function Menu({
  //camAz,
  //camAlt,
  // scale,
  displayTime,
  timeZone,
  displayFPS,
  fov,
  locationLabel,

  showGround,
  showDrawCardinals,
  showEquatorialGrid,
  showConstellations,
  showLabels,
  showBoundaries,

  onToggleGround,
  onToggleCardinals,
  onToggleEquatorialGrid,
  onToggleConstellations,
  onToggleLabels,
  onToggleBoundaries,

  onTimeFaster,
  onBackTimeFaster,
  onTimeNormal,
  onTimeNow,
  onSetTime,
  onOpenLocationPopup,

  //moonIllumination,
}: MenuPropsType) {

  const menuRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipStateType>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDatePicker(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showDatePicker]);



  return (
    <>
      {/* Info caméra : haut à gauche*/}
      {/* <div className="absolute top-4 left-4 p-3 bg-black/60 backdrop-blur-md rounded-xl shadow-xl text-sm space-y-2 text-white">
        <div>Az: {camAz.toFixed(1)}°</div>
        <div>Alt: {camAlt.toFixed(1)}°</div>
        <div>Zoom: {scale.toFixed(0)}</div>
        <div>
          Lune: {(moonIllumination * 100).toFixed(1)} %
        </div>
      </div> */}

      {/* date picker */}
      {showDatePicker && (
        <div className="absolute bottom-24 right-4 bg-brown p-3 border-2 border-white/50 rounded-lg shadow-xl z-50">
          <div className="text-xs text-white/80 mb-2">
            Date et heure
          </div>
          <input
            type="date"
            title="Date et heure"
            className="bg-gray-200/50 text-black p-1 rounded mr-2"
            value={displayTime.toISOString().slice(0, 10)}
            onChange={(e) => {
              if (!e.target.value) return;   // sécurité
              const [y, m, d] = e.target.value.split("-").map(Number);
              const newDate = new Date(displayTime);
              newDate.setFullYear(y, m - 1, d);
              onSetTime(newDate);
            }}

          />

          <input
            type="time"
            className="bg-gray-200/50 text-black p-1 rounded"
            value={displayTime.toTimeString().slice(0, 5)}
            onChange={(e) => {
              if (!e.target.value) return;
              const [h, min] = e.target.value.split(":").map(Number);;
              const newDate = new Date(displayTime);
              newDate.setHours(h, min);
              onSetTime(newDate);
            }}

          />

          <div className="mt-2 flex gap-2 justify-end">
            <button
              className="text-xs bg-white/10 px-2 py-1 rounded"
              onClick={() => onSetTime(new Date())}
            >
              Maintenant
            </button>

            <button
              className="text-xs bg-white/10 px-2 py-1 rounded"
              onClick={() => setShowDatePicker(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}




      {/* Menu bas droite */}
      <div ref={menuRef} className="absolute bottom-0 right-4 text-white group">

        <div className="bg-indigo-900/35 rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-out h-8 group-hover:h-20">

          {/* Temps */}
          <div className="flex justify-between items-center px-3 py-1 text-sm whitespace-nowrap">
            <span className="opacity-80">FPS : {displayFPS.toFixed(1)}</span>
            <span className="opacity-80">FOV : {fov.toFixed(1)}°</span>
            <span className="opacity-80">{locationLabel}</span>
            <div className="text-right">
              {displayTime.toLocaleDateString("fr-FR", { timeZone })}{" "}
              {displayTime.toLocaleTimeString("fr-FR", { timeZone })}{" "}
              <span className="opacity-80">
                {formatUTCOffset(displayTime, timeZone)}
              </span>
            </div>
          </div>

          {/* Icônes */}
          <div className="flex items-center justify-end gap-2 px-3 pt-2 opacity-0 translate-y-2 transition-all duration-100 ease-out group-hover:opacity-100 group-hover:translate-y-0">

            <IconButton tooltip="Changer de lieu" shortcut="L" setTooltip={setTooltip} onClick={onOpenLocationPopup}>
              <IoEarth size={28} />
            </IconButton>

            <IconButton active={showGround} tooltip="Sol" shortcut="S" setTooltip={setTooltip} onClick={onToggleGround}>
              <RiLandscapeLine size={28} />
            </IconButton>

            <IconButton active={showDrawCardinals} tooltip="Points cardinaux" shortcut="C" setTooltip={setTooltip} onClick={onToggleCardinals}>
              <RiCompass3Fill size={28} />
            </IconButton>

            <IconButton active={showEquatorialGrid} tooltip="Grille equatoriale" shortcut="E" setTooltip={setTooltip} onClick={onToggleEquatorialGrid}>
              <RxGlobe size={28} />
            </IconButton>

            <IconButton active={showEquatorialGrid} tooltip="Grille Azimutal" shortcut="E" setTooltip={setTooltip} onClick={onToggleEquatorialGrid}>
              <RxColorWheel size={28} />
            </IconButton>

            <IconButton active={showConstellations} tooltip="Lignes des constellations" shortcut="E" setTooltip={setTooltip} onClick={onToggleConstellations}>
              <VscSparkle size={28} />
            </IconButton>

            <IconButton active={showLabels} tooltip="Noms des constellations" shortcut="E" setTooltip={setTooltip} onClick={onToggleLabels}>
              <RxLetterCaseCapitalize size={28} />
            </IconButton>

            <IconButton active={showBoundaries} tooltip="Limite des constellations" shortcut="E" setTooltip={setTooltip} onClick={onToggleBoundaries}>
              <RxGroup size={28} />
            </IconButton>

            <IconButton tooltip="Choisir une date/heure" shortcut="A" setTooltip={setTooltip} onClick={() => setShowDatePicker(s => !s)}>
              <IoCalendarNumberOutline size={28} />
            </IconButton>

            <IconButton tooltip="Remonter le temps" shortcut="A" setTooltip={setTooltip} onClick={onBackTimeFaster}>
              <IoPlayBackSharp size={28} />
            </IconButton>

            <IconButton tooltip="Vitesse normale" shortcut="V" setTooltip={setTooltip} onClick={onTimeNormal}>
              <IoPlaySharp size={28} />
            </IconButton>

            <IconButton tooltip="Accélérer le temps" shortcut="A" setTooltip={setTooltip} onClick={onTimeFaster}>
              <IoPlayForwardSharp size={28} />
            </IconButton>

            <IconButton tooltip="Retour temps réel" shortcut="T" setTooltip={setTooltip} onClick={onTimeNow}>
              <RxReset size={28} />
            </IconButton>
          </div>
        </div>
      </div >
      <MenuTooltip tooltip={tooltip} anchorRef={menuRef} />
    </>
  );
}

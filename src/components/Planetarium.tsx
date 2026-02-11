import React, { useRef, useEffect, useState } from "react";
import starsData from "../data/stars.json";
import type { HitTargetType } from "../types/HitTargetType";
import { localSiderealTime } from "../astro/time";
import Menu from "./Menu";
import { drawScene } from "../render/drawScene";
import type { RenderContextType } from "../types/RenderContextType";
import { RAD2DEG } from "../astro/constants";
import LocationPopup from "./LocationPopUp";
import type { SettingsRefType } from "../types/SettingsRefType";
import { useSyncedRef } from "../hooks/useSyncedRef";
import tzlookup from "tz-lookup"
import { findClickedObject } from "../tools/findClickedObject";
import { getObjectUnderCursor } from "../tools/getObjetcUnderCursor";
import { getMousePos } from "../tools/getMousePos";
import '../App.css';
import InfoPanel from "./InfoPanel";

export default function Planetarium() {

  // hooks
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Etat simulé du temps 
  const clockRef = useRef({
    date: new Date(),   // UTC
    timeScale: 1,       // 1 = temps réel
    direction: 1, // 1 = vers le futur -1 vers le passé 
    paused: false,
  });

  // pour les fps
  const fpsRef = useRef({ frames: 0, lastUpdate: performance.now() });

  // pour le date picker
  const setTime = (date: Date) => {
    clockRef.current.date = new Date(date);
    clockRef.current.timeScale = 1;
    clockRef.current.direction = 1;
  };

  const [camAz, setCamAz] = useState(0);
  const [camAlt, setCamAlt] = useState(0.1);
  const [scale, setScale] = useState(500);
  const [showDrawCardinals, setShowDrawCardinals] = useState(true);
  const [showConstellations, setShowConstellations] = useState(false);
  const [showBoundaries, setShowBoundaries] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [showSelectedConstellation, setShowSelectedConstellation] = useState<string | null>(null);
  const [displayTime, setDisplayTime] = useState(new Date());
  const [showGround, setShowGround] = useState(false);
  const [showEquatorialGrid, setShowEquatorialGrid] = useState(true);
  const [moonIllumination, setMoonIllumination] = useState<number>(0);
  const [displayFPS, setDisplayFPS] = useState(0);
  const [fov, setFov] = useState(0);

  const [lat, setLat] = useState(48.8566);
  const [lon, setLon] = useState(2.3522);
  const [locationLabel, setLocationLabel] = useState("Paris (France)");
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [timeZone, setTimeZone] = useState("Europe/Paris");
  const [selectedObject, setSelectedObject] = useState<HitTargetType | null>(null);

  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);

  const hitTargetsRef = useRef<HitTargetType[]>([]);

  // useRef groupé
  const settingsRef = useSyncedRef<SettingsRefType>({
    camAz,
    camAlt,
    scale,
    lat,
    lon,
    showGround,
    showDrawCardinals,
    showEquatorialGrid,
    showConstellations,
    showBoundaries,
    showLabels,
    showSelectedConstellation
  });

  // click souris sur le planisphère 
  const onClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getMousePos(e, canvas);

    //parcourir les constellations
    const clicked = findClickedObject(x, y, hitTargetsRef.current);
    if (clicked) {
      if (clicked.objectType === "constellation") {
        setShowSelectedConstellation(clicked.code)
        setSelectedObject(null);
      } else {
        setSelectedObject(clicked);
        setShowSelectedConstellation(null);
      }
    } else {
      setSelectedObject(null);
      setShowSelectedConstellation(null); // rien cliqué
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;


    hitTargetsRef.current = [];   // remise à zéro
    // taille canvas
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const W = canvas.width;
    const H = canvas.height;

    // nettoyage
    ctx.clearRect(0, 0, W, H);

    // calcul du temps sidéral
    const s = settingsRef.current;
    const lst = localSiderealTime(clockRef.current.date, s.lon);

    const renderContext: RenderContextType = {
      ctx,
      W,
      H,
      date: clockRef.current.date,
      lat: s.lat,
      lon: s.lon,
      lst,
      camAz: s.camAz,
      camAlt: s.camAlt,
      scale: s.scale,
      showGround: s.showGround,
      showDrawCardinals: s.showDrawCardinals,
      showEquatorialGrid: s.showEquatorialGrid,
      showConstellations: s.showConstellations,
      showSelectedConstellation: s.showSelectedConstellation,
      showBoundaries: s.showBoundaries,
      showLabels: s.showLabels,
      hitTargets: hitTargetsRef.current,
      starsData,
      setMoonIllumination,
    };
    drawScene(renderContext);
  }

  const onMouseDown = (e: React.MouseEvent) => { setDrag({ x: e.clientX, y: e.clientY }); };

  const onMouseMove = (e: React.MouseEvent) => {

    const canvas = canvasRef.current;
    if (!canvas) return;

    const { x, y } = getMousePos(e, canvas);

    const over = getObjectUnderCursor(x, y, hitTargetsRef.current);

    canvas.style.cursor = over ? "pointer" : "default";

    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    setCamAz(a => a - dx * 0.2);
    setCamAlt(a => Math.max(-89, Math.min(89, a + dy * 0.2)));
    setDrag({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = () => setDrag(null);
  const onWheel = (e: React.WheelEvent) => setScale(s => Math.max(100, Math.min(2000, s - e.deltaY * 0.5)));

  useEffect(() => {
    if (canvasRef.current) {
      const W = canvasRef.current.width;
      const fovValue = 2 * Math.atan(W / (2 * scale)) * RAD2DEG;
      setFov(fovValue)
    }
  }, [scale])

  useEffect(() => {
    let lastTime = performance.now();
    let rafId: number;

    const loop = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (!clockRef.current.paused) {
        clockRef.current.date = new Date(
          clockRef.current.date.getTime() +
          delta * clockRef.current.timeScale * clockRef.current.direction
        );
      }
      setDisplayTime(new Date(clockRef.current.date));

      //calcul du fps
      fpsRef.current.frames++;

      const elapsed = now - fpsRef.current.lastUpdate;

      if (elapsed >= 2000) {
        setDisplayFPS((fpsRef.current.frames * 1000) / elapsed);
        fpsRef.current.frames = 0;
        fpsRef.current.lastUpdate = now;
      }

      draw();
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="w-full h-screen relative bg-black text-white select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onWheel={onWheel}
        onClick={onClick}
      ></canvas>
      <InfoPanel object={selectedObject} />

      <Menu
        camAz={camAz}
        camAlt={camAlt}
        scale={scale}
        displayTime={displayTime}
        timeZone={timeZone}
        displayFPS={displayFPS}
        fov={fov}
        locationLabel={locationLabel}
        moonIllumination={moonIllumination}

        onOpenLocationPopup={() => setShowLocationPopup(true)}

        showGround={showGround}
        showDrawCardinals={showDrawCardinals}
        showEquatorialGrid={showEquatorialGrid}
        showConstellations={showConstellations}
        showLabels={showLabels}
        showBoundaries={showBoundaries}

        onToggleGround={() => setShowGround(s => !s)}
        onToggleCardinals={() => setShowDrawCardinals(s => !s)}
        onToggleEquatorialGrid={() => setShowEquatorialGrid(s => !s)}
        onToggleConstellations={() => setShowConstellations(s => !s)}
        onToggleLabels={() => setShowLabels(s => !s)}
        onToggleBoundaries={() => setShowBoundaries(s => !s)}

        onTimeFaster={() => {
          clockRef.current.timeScale = Math.min(
            clockRef.current.timeScale * 2,
            43200
          );
          clockRef.current.direction = 1;
        }}

        onBackTimeFaster={() => {
          clockRef.current.timeScale = Math.min(
            clockRef.current.timeScale * 2,
            43200
          );
          clockRef.current.direction = -1;
        }}

        onTimeNormal={() => {
          clockRef.current.timeScale = 1;
        }}

        onTimeNow={() => {
          clockRef.current.date = new Date();
          clockRef.current.timeScale = 1;
        }}

        onSetTime={setTime}
      />
      {showLocationPopup && (
        <LocationPopup
          onClose={() => setShowLocationPopup(false)}
          onSelect={(loc) => {
            setLat(loc.lat);
            setLon(loc.lon);
            setLocationLabel(loc.label);

            const tz = tzlookup(loc.lat, loc.lon);
            setTimeZone(tz);
          }}
        />
      )}
    </div>
  );
}

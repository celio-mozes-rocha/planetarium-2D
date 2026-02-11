import { useEffect } from "react";
import { LOCATIONS, } from "../data/locations";
import type { LocationType } from "../types/LocationType"

type Props = {
  onClose: () => void;
  onSelect: (loc: LocationType) => void;
};

export default function LocationPopup({ onClose, onSelect }: Props) {

  // Fermer avec ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div className="
      absolute bottom-24 right-4
      bg-gray-900
      border border-white/20
      rounded-lg shadow-xl
      p-4 z-50 w-64
      animate-[fadeIn_0.15s_ease-out]
    ">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-white/90">
          Choisir un lieu
        </span>

        <button
          className="text-white/60 hover:text-white"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      <select
        className="w-full bg-white/90 text-black p-2 rounded"
        onChange={(e) => {
          const loc = LOCATIONS.find(l => l.label === e.target.value);
          if (loc) onSelect(loc);
        }}
        defaultValue=""
      >
        <option value="" disabled>
          -- Sélectionner une ville --
        </option>

        {LOCATIONS.map((loc) => (
          <option key={loc.label} value={loc.label}>
            {loc.label}
          </option>
        ))}
      </select>
    </div>
  );
}

"use client";

import React from "react";
import { POPULAR_CITIES } from "@/lib/solar/solarCalculator";
import { MapPin, Navigation } from "lucide-react";

interface LocationSearchProps {
  selectedCityName: string;
  onSelectCity: (city: { name: string; lat: number; lng: number }) => void;
  onUseGeolocation: () => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  selectedCityName,
  onSelectCity,
  onUseGeolocation,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-950/80 p-3.5 rounded-2xl border border-stone-800/80">
      <div className="flex items-center space-x-2 text-xs text-amber-300 font-semibold">
        <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Location Coordinates:</span>
        <span className="font-mono text-stone-200">{selectedCityName}</span>
      </div>

      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <select
          value={selectedCityName}
          onChange={(e) => {
            const city = POPULAR_CITIES.find((c) => c.name === e.target.value);
            if (city) onSelectCity(city);
          }}
          className="bg-stone-900 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-amber-500 cursor-pointer flex-1 sm:flex-none"
        >
          {POPULAR_CITIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={onUseGeolocation}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-950/70 border border-amber-800/60 hover:bg-amber-900/50 text-amber-300 text-xs font-medium transition-colors shrink-0"
          title="Auto Detect GPS Location"
        >
          <Navigation className="w-3 h-3 text-amber-400" />
          <span>Auto GPS</span>
        </button>
      </div>
    </div>
  );
};

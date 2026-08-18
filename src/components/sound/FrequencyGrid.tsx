"use client";

import React from "react";
import { SOLFEGGIO_FREQUENCIES } from "@/lib/audio/solfeggioFrequencies";
import { SolfeggioItem } from "@/types";
import { Play, Square, Sparkles, Check } from "lucide-react";

interface FrequencyGridProps {
  activeHz: number | null;
  onToggleFrequency: (hz: number) => void;
}

export const FrequencyGrid: React.FC<FrequencyGridProps> = ({
  activeHz,
  onToggleFrequency,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {SOLFEGGIO_FREQUENCIES.map((item: SolfeggioItem) => {
        const isPlaying = activeHz === item.hz;
        return (
          <div
            key={item.hz}
            className={`vedic-card relative overflow-hidden transition-all duration-300 ${
              isPlaying
                ? "bg-stone-900/90 border-amber-500/80 shadow-2xl ring-1 ring-amber-500/40"
                : "hover:border-stone-700/80"
            }`}
          >
            {/* Top Frequency Badge & Controls */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold font-mono text-amber-200">{item.hz} Hz</span>
                  <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300">
                    {item.chakra}
                  </span>
                </div>
                <h3 className="text-sm font-serif font-medium text-stone-200 mt-1">
                  {item.title}
                </h3>
                <p className="text-[11px] font-serif text-amber-400/90 font-medium">
                  {item.sanskritName}
                </p>
              </div>

              <button
                onClick={() => onToggleFrequency(item.hz)}
                className={`p-3 rounded-full transition-all duration-200 shadow-md ${
                  isPlaying
                    ? "bg-rose-600 hover:bg-rose-500 text-white animate-pulse"
                    : "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold"
                }`}
                title={isPlaying ? "Stop Frequency" : `Play ${item.hz} Hz`}
              >
                {isPlaying ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-stone-950 ml-0.5" />}
              </button>
            </div>

            <p className="text-xs text-stone-400 mt-3 leading-relaxed">
              {item.description}
            </p>

            {/* Benefits Badges */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-stone-800/60">
              {item.benefits.map((b, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-md bg-stone-950/70 border border-stone-800 text-stone-300"
                >
                  <Check className="w-2.5 h-2.5 text-amber-400 mr-1" />
                  {b}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

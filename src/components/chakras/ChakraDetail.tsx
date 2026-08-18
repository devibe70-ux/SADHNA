"use client";

import React from "react";
import { ChakraInfo } from "@/types";
import { Play, Square, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

interface ChakraDetailProps {
  chakra: ChakraInfo;
  isPlayingAudio: boolean;
  onToggleAudio: (freqHz: number) => void;
}

export const ChakraDetail: React.FC<ChakraDetailProps> = ({
  chakra,
  isPlayingAudio,
  onToggleAudio,
}) => {
  return (
    <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl backdrop-blur-xl space-y-6 animate-fade-in">
      {/* Title & Bija Mantra Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full shadow-lg"
              style={{ backgroundColor: chakra.hexColor }}
            />
            <h3 className="text-2xl font-serif font-bold text-amber-200">{chakra.name}</h3>
          </div>
          <p className="text-xs font-serif text-amber-400/90 font-medium mt-0.5">{chakra.sanskritName}</p>
        </div>

        {/* Bija Seed Mantra Badge & Audio Trigger */}
        <div className="flex items-center space-x-3">
          <div className="bg-stone-950 border border-stone-800 px-4 py-2 rounded-2xl text-center">
            <span className="text-[10px] text-stone-400 block uppercase font-mono">Bīja Seed Mantra</span>
            <span className="text-lg font-mono font-extrabold text-amber-300 tracking-wider">{chakra.bijaMantra}</span>
          </div>

          <button
            onClick={() => onToggleAudio(chakra.frequencyHz)}
            className={`p-3.5 rounded-full transition-all duration-200 shadow-lg ${
              isPlayingAudio
                ? "bg-rose-600 hover:bg-rose-500 text-white animate-pulse"
                : "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold"
            }`}
            title={isPlayingAudio ? "Stop Resonant Tone" : `Play ${chakra.frequencyHz} Hz Resonant Frequency`}
          >
            {isPlayingAudio ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-stone-950 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Description & Core Properties */}
      <p className="text-xs text-stone-300 leading-relaxed">
        {chakra.description}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800">
          <span className="text-stone-400 block text-[10px] uppercase">Element</span>
          <span className="font-semibold text-amber-200 mt-0.5 block">{chakra.element}</span>
        </div>
        <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800">
          <span className="text-stone-400 block text-[10px] uppercase">Resonant Freq</span>
          <span className="font-semibold text-amber-200 mt-0.5 block">{chakra.frequencyHz} Hz</span>
        </div>
        <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800">
          <span className="text-stone-400 block text-[10px] uppercase">Body Location</span>
          <span className="font-semibold text-amber-200 mt-0.5 block truncate">{chakra.location}</span>
        </div>
        <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800">
          <span className="text-stone-400 block text-[10px] uppercase">Lotus Petals</span>
          <span className="font-semibold text-amber-200 mt-0.5 block">{chakra.petalCount} Petals</span>
        </div>
      </div>

      {/* Affirmation Box */}
      <div className="bg-stone-950/80 p-4 rounded-2xl border border-stone-800/80 text-center space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">Resonant Affirmation</span>
        <p className="text-sm font-serif italic text-amber-100">"{chakra.affirmation}"</p>
      </div>

      {/* Balanced vs Unbalanced Guide */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="bg-emerald-950/20 p-4 rounded-2xl border border-emerald-800/40 space-y-1.5">
          <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Balanced Energy Flow
          </span>
          <p className="text-stone-300 leading-relaxed">{chakra.balancedSigns}</p>
        </div>

        <div className="bg-rose-950/20 p-4 rounded-2xl border border-rose-800/40 space-y-1.5">
          <span className="font-semibold text-rose-300 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-rose-400" /> Unbalanced / Blocked Flow
          </span>
          <p className="text-stone-300 leading-relaxed">{chakra.unbalancedSigns}</p>
        </div>
      </div>
    </div>
  );
};

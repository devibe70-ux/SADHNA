"use client";

import React, { useState } from "react";
import { BreathPreset } from "./PresetSelector";
import { X, Check } from "lucide-react";

interface CustomRatioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCustom: (preset: BreathPreset) => void;
  currentPreset: BreathPreset;
}

export const CustomRatioModal: React.FC<CustomRatioModalProps> = ({
  isOpen,
  onClose,
  onApplyCustom,
  currentPreset,
}) => {
  const [inhale, setInhale] = useState(currentPreset.inhale);
  const [holdIn, setHoldIn] = useState(currentPreset.holdIn);
  const [exhale, setExhale] = useState(currentPreset.exhale);
  const [holdOut, setHoldOut] = useState(currentPreset.holdOut);

  if (!isOpen) return null;

  const handleSave = () => {
    const customPreset: BreathPreset = {
      id: "custom",
      name: `Custom (${inhale}-${holdIn}-${exhale}-${holdOut})`,
      sanskritName: "स्वेच्छा प्राणायाम (Custom Pattern)",
      inhale: Math.max(1, inhale),
      holdIn,
      exhale: Math.max(1, exhale),
      holdOut,
      description: "User-configured custom breath cycle timing.",
    };
    onApplyCustom(customPreset);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-stone-100 shadow-2xl space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-200 p-1.5 rounded-full hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h3 className="text-xl font-serif text-amber-300 font-semibold">Custom Breath Pacer Ratio</h3>
          <p className="text-xs text-stone-400 mt-1">Configure millisecond-precise durations for each stage of the breath cycle.</p>
        </div>

        <div className="space-y-4 text-xs font-medium">
          {/* Puraka / Inhale */}
          <div className="space-y-1.5 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800">
            <div className="flex justify-between items-center text-cyan-300">
              <span>Puraka (Inhale)</span>
              <span className="font-mono text-sm font-bold text-amber-200">{inhale}s</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={inhale}
              onChange={(e) => setInhale(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Antara Kumbhaka / Hold In */}
          <div className="space-y-1.5 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800">
            <div className="flex justify-between items-center text-amber-300">
              <span>Antara Kumbhaka (Hold In)</span>
              <span className="font-mono text-sm font-bold text-amber-200">{holdIn}s</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={holdIn}
              onChange={(e) => setHoldIn(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Rechaka / Exhale */}
          <div className="space-y-1.5 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800">
            <div className="flex justify-between items-center text-rose-300">
              <span>Rechaka (Exhale)</span>
              <span className="font-mono text-sm font-bold text-amber-200">{exhale}s</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={exhale}
              onChange={(e) => setExhale(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Bahya Kumbhaka / Hold Out */}
          <div className="space-y-1.5 bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800">
            <div className="flex justify-between items-center text-emerald-300">
              <span>Bahya Kumbhaka (Hold Empty)</span>
              <span className="font-mono text-sm font-bold text-amber-200">{holdOut}s</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={holdOut}
              onChange={(e) => setHoldOut(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-full border border-stone-700 text-stone-300 text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center space-x-1.5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-colors shadow-lg shadow-amber-950/40"
          >
            <Check className="w-4 h-4" />
            <span>Apply Ratio</span>
          </button>
        </div>
      </div>
    </div>
  );
};

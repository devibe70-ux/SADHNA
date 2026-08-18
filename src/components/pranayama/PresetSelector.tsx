"use client";

import React from "react";
import { Sliders } from "lucide-react";

export interface BreathPreset {
  id: string;
  name: string;
  sanskritName: string;
  inhale: number;
  holdIn: number;
  exhale: number;
  holdOut: number;
  description: string;
}

export const PRESETS: BreathPreset[] = [
  {
    id: "box",
    name: "Sama Vritti (Box)",
    sanskritName: "समवृत्ति प्राणायाम",
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4,
    description: "Equal-ratio breathing that resets the nervous system and sharpens mental clarity."
  },
  {
    id: "478",
    name: "Shanti (4-7-8)",
    sanskritName: "शान्ति प्राणायाम",
    inhale: 4,
    holdIn: 7,
    exhale: 8,
    holdOut: 0,
    description: "Deep parasympathetic nerve relaxation designed to soothe anxiety and promote deep sleep."
  },
  {
    id: "nadi",
    name: "Nadi Shodhana",
    sanskritName: "नाडी शोधन (Purification)",
    inhale: 4,
    holdIn: 8,
    exhale: 8,
    holdOut: 0,
    description: "Clears subtle energetic channels (Ida & Pingala) balancing left & right brain hemispheres."
  },
  {
    id: "kapalabhati",
    name: "Kapalabhati (Fire)",
    sanskritName: "कपालभाति (Skull Shining)",
    inhale: 2,
    holdIn: 0,
    exhale: 2,
    holdOut: 0,
    description: "Rapid energetic abdominal exhalations igniting digestive fire (Agni) and mental vitality."
  }
];

interface PresetSelectorProps {
  selectedPresetId: string;
  onSelectPreset: (preset: BreathPreset) => void;
  onOpenCustomModal: () => void;
  isCustomActive: boolean;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  selectedPresetId,
  onSelectPreset,
  onOpenCustomModal,
  isCustomActive,
}) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
      {PRESETS.map((p) => {
        const isSelected = selectedPresetId === p.id && !isCustomActive;
        return (
          <button
            key={p.id}
            onClick={() => onSelectPreset(p)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
              isSelected
                ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-900/40 ring-2 ring-amber-400/50 scale-105 font-bold"
                : "bg-stone-900/90 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800"
            }`}
          >
            {p.name}
          </button>
        );
      })}

      <button
        onClick={onOpenCustomModal}
        className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 ${
          isCustomActive
            ? "bg-amber-500 text-stone-950 shadow-md shadow-amber-900/40 ring-2 ring-amber-400/50 font-bold"
            : "bg-stone-900/90 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-stone-800"
        }`}
      >
        <Sliders className="w-3 h-3 text-amber-400" />
        <span>Custom Ratio</span>
      </button>
    </div>
  );
};

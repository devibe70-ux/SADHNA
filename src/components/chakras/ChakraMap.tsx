"use client";

import React, { useState } from "react";
import { ChakraInfo, ChakraName } from "@/types";
import { ChakraDetail } from "./ChakraDetail";
import { audioSingleton } from "@/lib/audio/webAudioEngine";
import { CircleDot, Volume2 } from "lucide-react";

export const CHAKRA_DATA: ChakraInfo[] = [
  {
    id: "sahasrara",
    name: "Sahasrāra (Crown)",
    sanskritName: "सहस्रार चक्र",
    bijaMantra: "OM / SILENCE",
    element: "Cosmic Consciousness",
    frequencyHz: 963,
    color: "purple",
    hexColor: "#a855f7",
    location: "Crown of the Head",
    petalCount: 1000,
    description: "The gateway to Supreme Cosmic Oneness (Brahman). Connects finite individual soul with infinite transcendence.",
    affirmation: "I am one with the Supreme Cosmic Intelligence.",
    balancedSigns: "Profound spiritual wisdom, liberation from ego, serene inner peace.",
    unbalancedSigns: "Spiritual cynicism, apathy, attachment to physical illusions.",
    mudra: "Mahāśīrṣa Mudrā"
  },
  {
    id: "ajna",
    name: "Ājñā (Third Eye)",
    sanskritName: "आज्ञा चक्र",
    bijaMantra: "AUM",
    element: "Light & Mind (Manas)",
    frequencyHz: 852,
    color: "indigo",
    hexColor: "#6366f1",
    location: "Between eyebrows (Center of forehead)",
    petalCount: 2,
    description: "The seat of divine intuition, inner vision, and subtle perception beyond physical senses.",
    affirmation: "My inner vision is clear, intuitive, and aligned with truth.",
    balancedSigns: "Clarity of mind, heightened intuition, lucid perception.",
    unbalancedSigns: "Mental confusion, headaches, over-intellectualization, sleep disruption.",
    mudra: "Hakini Mudrā"
  },
  {
    id: "vishuddha",
    name: "Viśuddha (Throat)",
    sanskritName: "विशुद्ध चक्र",
    bijaMantra: "HAM",
    element: "Ether / Space (Ākāśa)",
    frequencyHz: 741,
    color: "sky",
    hexColor: "#0284c7",
    location: "Throat & Thyroid Gland",
    petalCount: 16,
    description: "The center of authentic self-expression, creative truth, and purified vocal resonance.",
    affirmation: "I speak my highest truth with clarity and compassion.",
    balancedSigns: "Articulate speech, deep listening ability, creative resonance.",
    unbalancedSigns: "Fear of speaking, sore throat, suppressed truth, gossip.",
    mudra: "Śūnya Mudrā"
  },
  {
    id: "anahata",
    name: "Anāhata (Heart)",
    sanskritName: "अनाहत चक्र",
    bijaMantra: "YAM",
    element: "Air (Vāyu)",
    frequencyHz: 639,
    color: "emerald",
    hexColor: "#10b981",
    location: "Center of Chest (Heart Space)",
    petalCount: 12,
    description: "The sacred bridge between lower physical and higher spiritual chakras. Radiates unconditional love (Maitrī).",
    affirmation: "My heart is open to give and receive unconditional love.",
    balancedSigns: "Deep empathy, forgiveness, harmony, emotional resilience.",
    unbalancedSigns: "Grief, jealousy, resentment, fear of intimacy or betrayal.",
    mudra: "Hṛdaya Mudrā"
  },
  {
    id: "manipura",
    name: "Maṇipūra (Solar Plexus)",
    sanskritName: "मणिपूर चक्र",
    bijaMantra: "RAM",
    element: "Fire (Agni)",
    frequencyHz: 528,
    color: "amber",
    hexColor: "#eab308",
    location: "Upper Abdomen (Navel)",
    petalCount: 10,
    description: "The seat of personal willpower, metabolic fire (Agni), courage, and self-mastery.",
    affirmation: "I act with courage, strength, and honorable purpose.",
    balancedSigns: "Strong digestive Agni, healthy boundaries, decisive confidence.",
    unbalancedSigns: "Digestive issues, anger outbursts, control issues, low self-worth.",
    mudra: "Sūrya Mudrā"
  },
  {
    id: "svadhisthana",
    name: "Svādhiṣṭhāna (Sacral)",
    sanskritName: "स्वाधिष्ठान चक्र",
    bijaMantra: "VAM",
    element: "Water (Jala)",
    frequencyHz: 417,
    color: "orange",
    hexColor: "#ea580c",
    location: "Lower Abdomen (Pelvis)",
    petalCount: 6,
    description: "The fluid center of emotional flow, sensuality, adaptability, and creative manifestation.",
    affirmation: "I embrace fluid change, creativity, and joyful vitality.",
    balancedSigns: "Emotional adaptability, artistic passion, joyful flow.",
    unbalancedSigns: "Emotional numbness, guilt, addiction, creative blockages.",
    mudra: "Varuṇa Mudrā"
  },
  {
    id: "muladhara",
    name: "Mūlādhāra (Root)",
    sanskritName: "मूलाधार चक्र",
    bijaMantra: "LAM",
    element: "Earth (Pṛthvī)",
    frequencyHz: 396,
    color: "rose",
    hexColor: "#f43f5e",
    location: "Base of Spine (Perineum)",
    petalCount: 4,
    description: "The foundational anchor establishing physical safety, vitality, and grounding in the material world.",
    affirmation: "I am safe, grounded, and deeply rooted in Mother Earth.",
    balancedSigns: "Unshakeable security, physical stamina, financial & emotional stability.",
    unbalancedSigns: "Chronic anxiety, paranoia, physical fatigue, hoarding tendencies.",
    mudra: "Pṛthvī Mudrā"
  }
];

export const ChakraMap: React.FC = () => {
  const [selectedChakra, setSelectedChakra] = useState<ChakraInfo>(CHAKRA_DATA[3]); // Default Anahata
  const [playingFreq, setPlayingFreq] = useState<number | null>(null);

  const handleToggleAudio = (freqHz: number) => {
    if (playingFreq === freqHz) {
      audioSingleton.stopSolfeggio();
      setPlayingFreq(null);
    } else {
      audioSingleton.startSolfeggio(freqHz, 0, 0.3);
      setPlayingFreq(freqHz);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Visual Body Map Container */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl backdrop-blur-xl">
        <div className="text-center max-w-lg mx-auto mb-8 space-y-1.5">
          <div className="inline-flex items-center space-x-1.5 bg-amber-950/70 border border-amber-800/60 px-3 py-1 rounded-full text-xs text-amber-300 font-semibold">
            <CircleDot className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Subtle Energy Map</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-amber-200 font-bold">
            The 7 Sacred Energy Centers (Chakras)
          </h2>
          <p className="text-xs text-stone-400">
            Select an energy vortex to explore its elemental resonance, seed mantra, and harmonic frequency.
          </p>
        </div>

        {/* Flex layout for SVG silhouette + Chakra List */}
        <div className="flex flex-col md:flex-row items-center justify-around gap-8">
          {/* Animated SVG Lotus Body Silhouette */}
          <div className="relative w-64 h-80 flex items-center justify-center bg-stone-950/60 rounded-3xl border border-stone-800/80 p-4">
            {/* Meditating Figure Outline SVG */}
            <svg viewBox="0 0 100 130" className="w-full h-full text-stone-800 opacity-60">
              <path
                d="M50,15 C43,15 38,20 38,27 C38,34 43,39 50,39 C57,39 62,34 62,27 C62,20 57,15 50,15 Z M50,42 C35,45 25,55 20,70 L15,95 C15,100 20,105 25,105 C30,105 32,95 35,90 L40,80 L40,115 C40,120 45,125 50,125 C55,125 60,120 60,115 L60,80 L65,90 C68,95 70,105 75,105 C80,105 85,100 85,95 L80,70 C75,55 65,45 50,42 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>

            {/* Glowing Chakra Overlay Nodes positioned vertically */}
            <div className="absolute inset-0 flex flex-col items-center justify-between py-6">
              {CHAKRA_DATA.map((c) => {
                const isSelected = selectedChakra.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedChakra(c)}
                    className={`group relative flex items-center justify-center transition-all duration-300 ${
                      isSelected ? "scale-125 z-20" : "hover:scale-110"
                    }`}
                    title={c.name}
                  >
                    {/* Glowing Aura Ring */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                        isSelected ? "ring-4 ring-white/80 shadow-lg" : "opacity-80"
                      }`}
                      style={{
                        backgroundColor: c.hexColor,
                        boxShadow: isSelected ? `0 0 20px ${c.hexColor}` : `0 0 8px ${c.hexColor}`,
                      }}
                    >
                      <span className="text-[9px] font-mono font-bold text-stone-950">
                        {c.bijaMantra.split(" ")[0]}
                      </span>
                    </div>

                    {/* Tooltip Label on Hover */}
                    <span className="absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 border border-stone-800 text-[10px] text-amber-200 px-2 py-0.5 rounded whitespace-nowrap z-30 pointer-events-none">
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chakra Quick Selector List */}
          <div className="w-full md:w-80 space-y-2">
            {CHAKRA_DATA.map((c) => {
              const isSelected = selectedChakra.id === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedChakra(c)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-stone-950 border-amber-500/80 shadow-lg ring-1 ring-amber-500/30"
                      : "bg-stone-950/60 border-stone-800/80 hover:border-stone-700"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-3.5 h-3.5 rounded-full shrink-0"
                      style={{ backgroundColor: c.hexColor }}
                    />
                    <div>
                      <h4 className="text-xs font-semibold text-stone-200">{c.name}</h4>
                      <span className="text-[10px] text-stone-400">{c.element}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300 px-2 py-0.5 bg-stone-900 border border-stone-800 rounded-lg">
                    {c.bijaMantra.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Chakra Detail Card */}
      <ChakraDetail
        chakra={selectedChakra}
        isPlayingAudio={playingFreq === selectedChakra.frequencyHz}
        onToggleAudio={handleToggleAudio}
      />
    </div>
  );
};

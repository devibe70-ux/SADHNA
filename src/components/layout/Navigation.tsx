"use client";

import React from "react";
import { Wind, Music, Sparkles, Sun, CircleDot, BookOpen, BarChart3 } from "lucide-react";

export type TabId = "pranayama" | "sound" | "dosha" | "solar" | "chakras" | "journal" | "dashboard";

interface NavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  doshaLabel?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  doshaLabel,
}) => {
  const tabs = [
    { id: "pranayama" as TabId, label: "Prānāyāma", icon: Wind, badge: "Breath Studio" },
    { id: "sound" as TabId, label: "Harmonic Sound", icon: Music, badge: "Solfeggio & Drone" },
    { id: "dosha" as TabId, label: "Prakriti Quiz", icon: Sparkles, badge: doshaLabel || "Dosha Profile" },
    { id: "solar" as TabId, label: "Brahma Muhurta", icon: Sun, badge: "Solar Timing" },
    { id: "chakras" as TabId, label: "7 Chakras", icon: CircleDot, badge: "Bīja Mantras" },
    { id: "journal" as TabId, label: "Sankalpa", icon: BookOpen, badge: "Intentions" },
    { id: "dashboard" as TabId, label: "Sādhanā Log", icon: BarChart3, badge: "Telemetry" },
  ];

  return (
    <nav className="w-full max-w-5xl mx-auto px-4 py-4">
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto space-x-1.5 p-1.5 rounded-2xl bg-stone-900/90 border border-stone-800/90 backdrop-blur-xl shadow-2xl no-scrollbar scroll-smooth">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onTabChange(t.id)}
              className={`flex items-center space-x-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-amber-600 to-amber-500 text-stone-950 shadow-lg shadow-amber-900/40 ring-1 ring-amber-400/40 font-bold scale-[1.02]"
                  : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/60"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-stone-950" : "text-amber-400/80"}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

"use client";

import React from "react";
import { DoshaScoreResult } from "@/lib/prakriti/doshaEngine";
import { Sparkles, Utensils, Heart, Wind, RefreshCw, CheckCircle2 } from "lucide-react";

interface PrakritiResultsProps {
  result: DoshaScoreResult;
  onRetakeQuiz: () => void;
}

export const PrakritiResults: React.FC<PrakritiResultsProps> = ({
  result,
  onRetakeQuiz,
}) => {
  return (
    <div className="bg-stone-900/95 border border-stone-800 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto text-stone-100 shadow-2xl backdrop-blur-xl space-y-8 animate-fade-in">
      {/* Header Profile Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-1.5 bg-amber-950/70 border border-amber-800/60 px-3.5 py-1 rounded-full text-xs text-amber-300 font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ayurvedic Prakriti Profile</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-amber-200 font-bold tracking-wide">
          {result.primaryDosha}
        </h2>
        <p className="text-xs text-stone-300 max-w-lg mx-auto leading-relaxed">
          {result.description}
        </p>
      </div>

      {/* Tri-Dosha Elemental Progress Bars */}
      <div className="space-y-4 bg-stone-950/80 p-6 rounded-2xl border border-stone-800/80 shadow-inner">
        <h3 className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-2 font-semibold">
          Pañcamahābhūta Element Breakdown
        </h3>

        {/* Vata Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-cyan-400 flex items-center gap-1">Vata (Air & Ether)</span>
            <span className="font-mono text-cyan-200">{result.vataScore}%</span>
          </div>
          <div className="w-full bg-stone-800 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-cyan-500 to-sky-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${result.vataScore}%` }}
            />
          </div>
        </div>

        {/* Pitta Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-rose-400 flex items-center gap-1">Pitta (Fire & Water)</span>
            <span className="font-mono text-rose-200">{result.pittaScore}%</span>
          </div>
          <div className="w-full bg-stone-800 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-rose-500 to-orange-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${result.pittaScore}%` }}
            />
          </div>
        </div>

        {/* Kapha Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1">
            <span className="text-emerald-400 flex items-center gap-1">Kapha (Earth & Water)</span>
            <span className="font-mono text-emerald-200">{result.kaphaScore}%</span>
          </div>
          <div className="w-full bg-stone-800 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${result.kaphaScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tailored Sādhanā Prescription */}
      <div className="space-y-3 pt-2">
        <h3 className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
          <Wind className="w-4 h-4 text-amber-400" /> Tailored Daily Sādhanā Prescription
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
            <span className="text-stone-400 block text-[10px] uppercase">Recommended Breathwork</span>
            <span className="font-semibold text-amber-200 mt-0.5 block">{result.recommendations.recommendedPranayama}</span>
          </div>
          <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
            <span className="text-stone-400 block text-[10px] uppercase">Healing Frequency</span>
            <span className="font-semibold text-amber-200 mt-0.5 block">{result.recommendations.healingFrequencies}</span>
          </div>
          <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
            <span className="text-stone-400 block text-[10px] uppercase">Chakra Focus</span>
            <span className="font-semibold text-amber-200 mt-0.5 block">{result.recommendations.meditationFocus}</span>
          </div>
          <div className="bg-stone-950/60 p-3.5 rounded-xl border border-stone-800">
            <span className="text-stone-400 block text-[10px] uppercase">Herbal Support</span>
            <span className="font-semibold text-amber-200 mt-0.5 block">{result.recommendations.herbalSupport}</span>
          </div>
        </div>
      </div>

      {/* Dietary & Lifestyle Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800 space-y-2">
          <h4 className="font-semibold text-amber-300 flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-amber-400" /> Dietary Guidelines (Āhāra)
          </h4>
          <ul className="space-y-1.5 text-stone-300">
            {result.dietAdvice.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800 space-y-2">
          <h4 className="font-semibold text-amber-300 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-amber-400" /> Lifestyle Rituals (Dinacharyā)
          </h4>
          <ul className="space-y-1.5 text-stone-300">
            {result.lifestyleAdvice.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex justify-center pt-2">
        <button
          onClick={onRetakeQuiz}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors border border-stone-700"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retake Diagnostic Quiz</span>
        </button>
      </div>
    </div>
  );
};

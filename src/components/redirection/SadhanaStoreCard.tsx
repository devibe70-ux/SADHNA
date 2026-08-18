"use client";

import React from "react";
import { Sparkles, ArrowUpRight, Wind, Music, ShieldCheck } from "lucide-react";

interface SadhanaStoreCardProps {
  appUrl?: string;
}

export const SadhanaStoreCard: React.FC<SadhanaStoreCardProps> = ({
  appUrl = "https://sadhna-sanatan.vercel.app", // Replace with your live Vercel / Custom domain
}) => {
  return (
    <div className="bg-stone-900 border border-stone-800 hover:border-amber-500/50 rounded-3xl p-6 text-stone-100 shadow-2xl transition-all duration-300 flex flex-col justify-between group max-w-sm w-full relative overflow-hidden">
      {/* Background Amber Gradient Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

      <div>
        {/* Store Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center space-x-1 bg-amber-950/80 border border-amber-800/60 px-3 py-1 rounded-full text-[10px] uppercase font-mono font-semibold text-amber-300">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Sanatan Digital Program</span>
          </span>
          <span className="text-xs font-mono font-bold text-amber-400">Included Access</span>
        </div>

        {/* Store Card Title & Subtitle */}
        <h3 className="text-xl font-serif text-amber-200 font-bold group-hover:text-amber-100 transition-colors">
          Sādhana — Sanatan Healing & Meditation Studio
        </h3>
        <p className="text-xs text-stone-400 mt-2 leading-relaxed font-sans">
          Authentic Vedic Prānāyāma breathwork pacer, 10 Solfeggio soundscapes, 7 Chakras Bīja mantras, Prakriti diagnostic quiz, and Brahma Muhurta solar calculator.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-stone-800/80">
          <span className="inline-flex items-center text-[10px] font-mono text-stone-300 bg-stone-950 px-2.5 py-1 rounded-md border border-stone-800">
            <Wind className="w-3 h-3 text-cyan-400 mr-1" /> Breathwork
          </span>
          <span className="inline-flex items-center text-[10px] font-mono text-stone-300 bg-stone-950 px-2.5 py-1 rounded-md border border-stone-800">
            <Music className="w-3 h-3 text-amber-400 mr-1" /> Solfeggio
          </span>
          <span className="inline-flex items-center text-[10px] font-mono text-stone-300 bg-stone-950 px-2.5 py-1 rounded-md border border-stone-800">
            <ShieldCheck className="w-3 h-3 text-emerald-400 mr-1" /> Ad-Free
          </span>
        </div>
      </div>

      {/* Redirect Button */}
      <div className="pt-6">
        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-extrabold py-3 px-6 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-950/40 group-hover:scale-[1.02] active:scale-95"
        >
          <span>Launch Sādhana Program</span>
          <ArrowUpRight className="w-4 h-4 text-stone-950" />
        </a>
      </div>
    </div>
  );
};

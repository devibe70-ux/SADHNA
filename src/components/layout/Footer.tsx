"use client";

import React from "react";
import { Heart, Volume2, ShieldCheck, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-stone-800/80 bg-stone-950/80 text-stone-400 py-10 px-6 mt-16 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Sanskrit Prayer & Mantra */}
        <div className="space-y-1.5 max-w-md">
          <div className="flex items-center justify-center md:justify-start space-x-2 text-amber-300 font-serif text-sm">
            <span>ॐ सर्वे भवन्तु सुखिनः। सर्वे सन्तु निरामयाः।</span>
          </div>
          <p className="text-xs text-stone-400 font-sans leading-relaxed">
            "May all beings everywhere be happy and free, and may the thoughts, words, and actions of my own life contribute in some way to that happiness and freedom for all."
          </p>
        </div>

        {/* Technical Features & Status */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-400">
          <div className="flex items-center space-x-1.5 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl">
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Web Audio API Synthesizer</span>
          </div>
          <div className="flex items-center space-x-1.5 bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Private & Offline First</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto border-t border-stone-800/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400">
        <p>© Sādhana — Sanatan Healing & Meditation Web Platform. Built for authentic Dhyāna practice.</p>
        <p className="flex items-center space-x-1 mt-2 sm:mt-0">
          <span>Crafted with devotion & mathematical precision</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500 ml-1" />
        </p>
      </div>
    </footer>
  );
};

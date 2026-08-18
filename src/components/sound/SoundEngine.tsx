"use client";

import React, { useState } from "react";
import { FrequencyGrid } from "./FrequencyGrid";
import { AudioVisualizer } from "./AudioVisualizer";
import { audioSingleton } from "@/lib/audio/webAudioEngine";
import { Volume2, Music2, Radio, Waves } from "lucide-react";

export const SoundEngine: React.FC = () => {
  const [activeHz, setActiveHz] = useState<number | null>(null);
  const [binauralBeatHz, setBinauralBeatHz] = useState<number>(0); // 0 = off, 4 = Theta, 8 = Alpha
  const [isTanpuraActive, setIsTanpuraActive] = useState<boolean>(false);
  const [solfeggioVolume, setSolfeggioVolume] = useState<number>(0.3);

  const handleToggleFrequency = (hz: number) => {
    if (activeHz === hz) {
      audioSingleton.stopSolfeggio();
      setActiveHz(null);
    } else {
      audioSingleton.startSolfeggio(hz, binauralBeatHz, solfeggioVolume);
      setActiveHz(hz);
    }
  };

  const handleBinauralChange = (beatHz: number) => {
    setBinauralBeatHz(beatHz);
    if (activeHz) {
      audioSingleton.startSolfeggio(activeHz, beatHz, solfeggioVolume);
    }
  };

  const handleToggleTanpura = () => {
    if (isTanpuraActive) {
      audioSingleton.stopTanpuraDrone();
      setIsTanpuraActive(false);
    } else {
      audioSingleton.startTanpuraDrone(136.1, 0.25);
      setIsTanpuraActive(true);
    }
  };

  const handleVolumeSlider = (vol: number) => {
    setSolfeggioVolume(vol);
    audioSingleton.setSolfeggioVolume(vol);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Real-Time Audio Canvas Visualizer & Sound Hub Banner */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400">
              <Radio className="w-5 h-5 animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-widest font-semibold">Nāda Yoga Engine</span>
            </div>
            <h2 className="text-2xl font-serif text-amber-200 mt-1 font-semibold">
              Harmonic Solfeggio & Acoustic Soundscapes
            </h2>
            <p className="text-xs text-stone-400 mt-1 max-w-xl leading-relaxed">
              Synthesize pure mathematical sine waves, binaural brainwave entrainment, and Tanpura acoustic drones directly via your browser's Web Audio API.
            </p>
          </div>

          <AudioVisualizer />
        </div>

        {/* Multi-Channel Controls Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-800/80">
          {/* Binaural Beat Channel */}
          <div className="bg-stone-950/70 p-3.5 rounded-2xl border border-stone-800/80 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-amber-300">
              <span className="flex items-center gap-1.5"><Waves className="w-3.5 h-3.5 text-amber-400" /> Binaural Detune</span>
              <span className="font-mono text-stone-300">{binauralBeatHz > 0 ? `+${binauralBeatHz} Hz` : "Off"}</span>
            </div>
            <div className="flex space-x-1.5 pt-1">
              {[
                { label: "Off", val: 0 },
                { label: "Theta 4Hz", val: 4 },
                { label: "Alpha 8Hz", val: 8 },
                { label: "Beta 14Hz", val: 14 },
              ].map((b) => (
                <button
                  key={b.label}
                  onClick={() => handleBinauralChange(b.val)}
                  className={`flex-1 py-1 text-[10px] font-semibold rounded-lg transition-colors ${
                    binauralBeatHz === b.val
                      ? "bg-amber-600 text-stone-950 font-bold"
                      : "bg-stone-900 text-stone-400 hover:bg-stone-800"
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tanpura Acoustic Drone Channel */}
          <div className="bg-stone-950/70 p-3.5 rounded-2xl border border-stone-800/80 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-amber-300">
              <span className="flex items-center gap-1.5"><Music2 className="w-3.5 h-3.5 text-amber-400" /> Tanpura Drone (Sa-Pa)</span>
              <span className="font-mono text-stone-300">136.1 Hz OM</span>
            </div>
            <button
              onClick={handleToggleTanpura}
              className={`w-full py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                isTanpuraActive
                  ? "bg-rose-600 text-white font-bold animate-pulse"
                  : "bg-amber-600 text-stone-950 hover:bg-amber-500 font-bold"
              }`}
            >
              {isTanpuraActive ? "Stop Tanpura Drone" : "Start Tanpura Drone"}
            </button>
          </div>

          {/* Master Volume Channel */}
          <div className="bg-stone-950/70 p-3.5 rounded-2xl border border-stone-800/80 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-amber-300">
              <span className="flex items-center gap-1.5"><Volume2 className="w-3.5 h-3.5 text-amber-400" /> Frequency Volume</span>
              <span className="font-mono text-stone-300">{Math.round(solfeggioVolume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={solfeggioVolume}
              onChange={(e) => handleVolumeSlider(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer pt-1"
            />
          </div>
        </div>
      </div>

      {/* Grid of 10 Solfeggio Frequency Cards */}
      <FrequencyGrid activeHz={activeHz} onToggleFrequency={handleToggleFrequency} />
    </div>
  );
};

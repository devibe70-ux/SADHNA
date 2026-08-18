"use client";

import React, { useState, useEffect, useRef } from "react";
import { PresetSelector, PRESETS, BreathPreset } from "./PresetSelector";
import { CustomRatioModal } from "./CustomRatioModal";
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Sparkles } from "lucide-react";
import { audioSingleton } from "@/lib/audio/webAudioEngine";

type Phase = "inhale" | "holdIn" | "exhale" | "holdOut";

interface BreathStudioProps {
  onLogPractice: (category: string, title: string, durationSec: number) => void;
}

export const BreathStudio: React.FC<BreathStudioProps> = ({ onLogPractice }) => {
  const [selectedPreset, setSelectedPreset] = useState<BreathPreset>(PRESETS[0]);
  const [isCustomActive, setIsCustomActive] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentPhase, setCurrentPhase] = useState<Phase>("inhale");
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(PRESETS[0].inhale);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [totalSessionSeconds, setTotalSessionSeconds] = useState<number>(0);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);
  const [justLogged, setJustLogged] = useState<boolean>(false);

  const sessionTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Handle Breath Stage Phase Transitions
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setPhaseSecondsLeft((prev) => {
          if (prev > 1) return prev - 1;

          // Play phase transition chime if sound is enabled
          if (!isSoundMuted) {
            audioSingleton.playPhaseBell(432, 2.0);
          }

          // Advance through the 4 breath states
          if (currentPhase === "inhale") {
            if (selectedPreset.holdIn > 0) {
              setCurrentPhase("holdIn");
              return selectedPreset.holdIn;
            }
            setCurrentPhase("exhale");
            return selectedPreset.exhale;
          } else if (currentPhase === "holdIn") {
            setCurrentPhase("exhale");
            return selectedPreset.exhale;
          } else if (currentPhase === "exhale") {
            if (selectedPreset.holdOut > 0) {
              setCurrentPhase("holdOut");
              return selectedPreset.holdOut;
            }
            setCurrentPhase("inhale");
            setCompletedCycles((c) => c + 1);
            return selectedPreset.inhale;
          } else {
            // holdOut completed
            setCurrentPhase("inhale");
            setCompletedCycles((c) => c + 1);
            return selectedPreset.inhale;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, currentPhase, selectedPreset, isSoundMuted]);

  // Session timer incrementer
  useEffect(() => {
    if (isActive) {
      sessionTimerRef.current = setInterval(() => {
        setTotalSessionSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    }

    return () => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    };
  }, [isActive]);

  const handleSelectPreset = (preset: BreathPreset) => {
    setIsActive(false);
    setIsCustomActive(false);
    setSelectedPreset(preset);
    setCurrentPhase("inhale");
    setPhaseSecondsLeft(preset.inhale);
  };

  const handleApplyCustom = (preset: BreathPreset) => {
    setIsActive(false);
    setIsCustomActive(true);
    setSelectedPreset(preset);
    setCurrentPhase("inhale");
    setPhaseSecondsLeft(preset.inhale);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase("inhale");
    setPhaseSecondsLeft(selectedPreset.inhale);
    setCompletedCycles(0);
    setTotalSessionSeconds(0);
    setJustLogged(false);
  };

  const handleFinishAndLog = () => {
    if (totalSessionSeconds < 5) return;
    setIsActive(false);
    onLogPractice("pranayama", selectedPreset.name, totalSessionSeconds);
    setJustLogged(true);
    setTimeout(() => setJustLogged(false), 4000);
  };

  const getPhaseDetails = () => {
    switch (currentPhase) {
      case "inhale":
        return { en: "Inhale (Puraka)", sa: "पूरक", color: "text-cyan-300", bgGlow: "from-cyan-500/30 to-amber-500/20" };
      case "holdIn":
        return { en: "Retain (Antar Kumbhaka)", sa: "अन्तर कुम्भक", color: "text-amber-300", bgGlow: "from-amber-500/40 to-orange-600/30" };
      case "exhale":
        return { en: "Exhale (Rechaka)", sa: "रेचक", color: "text-rose-300", bgGlow: "from-rose-500/30 to-amber-500/20" };
      case "holdOut":
        return { en: "Suspend (Bahya Kumbhaka)", sa: "बाह्य कुम्भक", color: "text-emerald-300", bgGlow: "from-emerald-500/30 to-stone-700/20" };
    }
  };

  // Scale class for smooth concentric geometric ring animation
  const getScaleStyle = () => {
    if (!isActive) return { transform: "scale(1)" };
    const duration = selectedPreset[currentPhase] || 1;
    if (currentPhase === "inhale" || currentPhase === "holdIn") {
      return {
        transform: "scale(1.25)",
        transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
      };
    }
    return {
      transform: "scale(0.85)",
      transition: `transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1)`,
    };
  };

  const formatMinSec = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const phaseDetails = getPhaseDetails();

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 max-w-2xl mx-auto text-stone-100 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Background Subtle Mandala Pattern Glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Preset Buttons */}
      <PresetSelector
        selectedPresetId={selectedPreset.id}
        onSelectPreset={handleSelectPreset}
        onOpenCustomModal={() => setIsModalOpen(true)}
        isCustomActive={isCustomActive}
      />

      {/* Preset Title & Sanskrit Description */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-serif text-amber-300 tracking-wide font-semibold">
          {selectedPreset.sanskritName}
        </h2>
        <p className="text-xs text-stone-400 mt-1.5 max-w-md mx-auto leading-relaxed">
          {selectedPreset.description}
        </p>
      </div>

      {/* Visual Animated Breathing Pacer */}
      <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80 mx-auto my-6">
        {/* Outer Aura Ripple */}
        <div
          style={getScaleStyle()}
          className={`absolute inset-0 rounded-full bg-gradient-to-tr ${phaseDetails.bgGlow} blur-3xl opacity-60 pointer-events-none`}
        />

        {/* Concentric Geometric Rings */}
        <div
          style={getScaleStyle()}
          className="w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-amber-500/30 flex items-center justify-center shadow-2xl relative"
        >
          {/* Inner Glowing Lotus Core */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-stone-950/80 backdrop-blur-md flex flex-col items-center justify-center border border-amber-400/40 shadow-inner px-4 text-center">
            <span className={`text-xs font-semibold uppercase tracking-widest ${phaseDetails.color}`}>
              {phaseDetails.sa}
            </span>
            <span className="text-5xl sm:text-6xl font-mono font-light text-amber-100 my-1 font-numeric tracking-tight">
              {isActive ? phaseSecondsLeft : selectedPreset.inhale}
            </span>
            <span className="text-xs text-stone-300 font-sans tracking-wide">
              {phaseDetails.en}
            </span>
          </div>
        </div>
      </div>

      {/* Live Telemetry & Control Buttons */}
      <div className="mt-8 flex flex-col items-center space-y-6">
        <div className="flex items-center justify-center space-x-8 text-xs font-mono text-stone-400">
          <div>
            <span>Completed Cycles: </span>
            <span className="text-amber-400 font-bold">{completedCycles}</span>
          </div>
          <div>
            <span>Session Time: </span>
            <span className="text-amber-400 font-bold">{formatMinSec(totalSessionSeconds)}</span>
          </div>
        </div>

        {/* Play, Pause, Reset, Audio Controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSoundMuted(!isSoundMuted)}
            className="p-3 rounded-full bg-stone-950 border border-stone-800 hover:border-amber-500/40 text-stone-400 hover:text-amber-300 transition-colors"
            title={isSoundMuted ? "Unmute Phase Bells" : "Mute Phase Bells"}
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center space-x-2 px-8 py-3.5 rounded-full font-semibold tracking-wider uppercase text-xs transition-all duration-300 shadow-xl ${
              isActive
                ? "bg-stone-800 text-stone-200 hover:bg-stone-700 border border-stone-600"
                : "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-extrabold shadow-amber-900/50 scale-105"
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4 fill-stone-200" />
                <span>Pause Practice</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-stone-950" />
                <span>Begin Sādhana</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3 rounded-full bg-stone-950 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
            title="Reset Pacer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Session Log Confirmation Button */}
        {totalSessionSeconds >= 5 && (
          <div className="pt-2">
            {justLogged ? (
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span>Sādhanā session logged to your telemetry streak!</span>
              </div>
            ) : (
              <button
                onClick={handleFinishAndLog}
                className="flex items-center space-x-1.5 text-xs text-amber-300 hover:text-amber-200 underline underline-offset-4 font-medium transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Log {formatMinSec(totalSessionSeconds)} practice to your Sādhanā Streak</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Custom Modal */}
      <CustomRatioModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApplyCustom={handleApplyCustom}
        currentPreset={selectedPreset}
      />
    </div>
  );
};

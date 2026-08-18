"use client";

import React from "react";
import { PracticeLog } from "@/types";
import { Wind, Music, Sparkles, CheckCircle2, Clock } from "lucide-react";

interface PracticeStatsProps {
  logs: PracticeLog[];
}

export const PracticeStats: React.FC<PracticeStatsProps> = ({ logs }) => {
  if (logs.length === 0) {
    return (
      <div className="text-center py-8 text-xs text-stone-500 font-mono">
        No completed practice logs recorded yet. Begin a Prānāyāma or Sound session to log telemetry!
      </div>
    );
  }

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "pranayama":
        return <Wind className="w-3.5 h-3.5 text-cyan-400" />;
      case "sound_therapy":
        return <Music className="w-3.5 h-3.5 text-amber-400" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400 font-semibold mb-3">
        Recent Practice Telemetry Audit ({logs.length})
      </h4>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1 no-scrollbar">
        {logs.map((log, idx) => {
          const dateFormatted = new Date(log.timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
          const mins = Math.max(1, Math.round(log.durationSeconds / 60));

          return (
            <div
              key={log.id || idx}
              className="bg-stone-950/70 p-3 rounded-2xl border border-stone-800/80 flex items-center justify-between text-xs"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-stone-900 border border-stone-800">
                  {getCategoryIcon(log.category)}
                </div>
                <div>
                  <h5 className="font-semibold text-stone-200">{log.patternOrTitle}</h5>
                  <span className="text-[10px] text-stone-400 font-mono">{dateFormatted}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 font-mono">
                <div className="flex items-center space-x-1 text-amber-300">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <span>{mins} min</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

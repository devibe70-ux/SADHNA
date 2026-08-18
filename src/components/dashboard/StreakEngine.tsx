"use client";

import React, { useState, useEffect } from "react";
import { UserProfile, PracticeLog } from "@/types";
import { PracticeStats } from "./PracticeStats";
import { fetchPracticeLogs } from "@/lib/firebase/dbService";
import { Flame, Clock, Award, ShieldCheck, Sparkles, Trophy } from "lucide-react";

interface StreakEngineProps {
  user: UserProfile;
}

export const StreakEngine: React.FC<StreakEngineProps> = ({ user }) => {
  const [logs, setLogs] = useState<PracticeLog[]>([]);

  useEffect(() => {
    if (user && user.uid) {
      fetchPracticeLogs(user.uid).then((res) => setLogs(res));
    }
  }, [user]);

  const streak = user.streakCount || 1;
  const totalMinutes = user.totalMinutesMeditated || 0;

  const milestones = [
    { title: "3-Day Sādhaka", days: 3, unlocked: streak >= 3, desc: "Sustained 3 days of daily mindfulness." },
    { title: "7-Day Tapasvī", days: 7, unlocked: streak >= 7, desc: "Dedicated a full week of spiritual discipline." },
    { title: "21-Day Yogī", days: 21, unlocked: streak >= 21, desc: "Formed a neuroplastic daily habit." },
    { title: "108-Day Siddha", days: 108, unlocked: streak >= 108, desc: "Mastered auspicious 108-cycle perfection." },
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Telemetry Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Streak Counter Card */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 text-stone-100 shadow-2xl backdrop-blur-xl flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-950 to-orange-900 border border-amber-600/50 flex items-center justify-center shadow-lg shrink-0">
            <Flame className="w-8 h-8 text-orange-400 fill-amber-500 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-semibold block">
              Contiguous Streak
            </span>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-3xl font-mono font-extrabold text-amber-200">{streak}</span>
              <span className="text-xs text-stone-400">Days</span>
            </div>
          </div>
        </div>

        {/* Total Mindful Minutes Card */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 text-stone-100 shadow-2xl backdrop-blur-xl flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-stone-950 to-stone-900 border border-stone-800 flex items-center justify-center shadow-lg shrink-0">
            <Clock className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-semibold block">
              Mindful Practice
            </span>
            <div className="flex items-baseline space-x-1.5 mt-0.5">
              <span className="text-3xl font-mono font-extrabold text-amber-200">{totalMinutes}</span>
              <span className="text-xs text-stone-400">Minutes</span>
            </div>
          </div>
        </div>

        {/* Practice Level Card */}
        <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 text-stone-100 shadow-2xl backdrop-blur-xl flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-stone-950 to-stone-900 border border-stone-800 flex items-center justify-center shadow-lg shrink-0">
            <Trophy className="w-7 h-7 text-amber-400" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-stone-400 font-semibold block">
              Sādhanā Standing
            </span>
            <span className="text-base font-serif font-bold text-amber-200 mt-0.5 block capitalize">
              {streak >= 21 ? "Master Yogi" : streak >= 7 ? "Tapasvī Practitioner" : "Devoted Sādhaka"}
            </span>
          </div>
        </div>
      </div>

      {/* Sādhanā Milestone Badges */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex items-center space-x-2 text-amber-400">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-serif text-amber-200 font-semibold">
            Sādhanā Discipline Milestones
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {milestones.map((m) => (
            <div
              key={m.title}
              className={`p-4 rounded-2xl border transition-all ${
                m.unlocked
                  ? "bg-amber-950/40 border-amber-500/80 shadow-lg shadow-amber-950/30"
                  : "bg-stone-950/60 border-stone-800/80 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-serif font-bold text-stone-200">{m.title}</span>
                {m.unlocked ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-mono text-stone-500">{m.days} Days</span>
                )}
              </div>
              <p className="text-[11px] text-stone-400 leading-snug">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Telemetry Practice Audit Logs */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl backdrop-blur-xl">
        <PracticeStats logs={logs} />
      </div>
    </div>
  );
};

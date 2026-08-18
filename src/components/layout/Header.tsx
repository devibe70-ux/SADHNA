"use client";

import React from "react";
import { UserProfile } from "@/types";
import { Flame, Sparkles, UserCheck, Sun, LogIn, LogOut, Heart } from "lucide-react";

interface HeaderProps {
  user: UserProfile | null;
  brahmaTimeFormatted: string;
  onOpenAuth: () => void;
  onOpenDakshina: () => void;
  onSignOut: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  brahmaTimeFormatted,
  onOpenAuth,
  onOpenDakshina,
  onSignOut,
}) => {
  return (
    <header className="border-b border-stone-800/80 bg-stone-950/75 backdrop-blur-xl sticky top-0 z-50 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-2xl transition-all">
      {/* Brand & Sanskrit Logo */}
      <div className="flex items-center space-x-3.5">
        <div className="relative group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-700 via-amber-500 to-orange-500 flex items-center justify-center font-serif text-stone-950 font-extrabold text-lg shadow-lg shadow-amber-900/40 ring-2 ring-amber-400/30 group-hover:scale-105 transition-transform">
            ॐ
          </div>
          <div className="absolute -inset-1 bg-amber-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-lg font-serif tracking-wider font-semibold text-amber-100">
              Sādhana
            </h1>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-300 font-medium">
              Vedic Wellness
            </span>
          </div>
          <p className="text-[10px] text-stone-400 font-sans tracking-widest uppercase">
            Sanatan Healing & Dhyāna Studio
          </p>
        </div>
      </div>

      {/* Right Controls: Solar Timing, Streak Badge, Support Button, Auth */}
      <div className="flex items-center space-x-2.5 sm:space-x-3">
        {/* Brahma Muhurta Quick Badge */}
        <div className="hidden lg:flex items-center space-x-2 bg-stone-900/90 border border-stone-800 px-3.5 py-1.5 rounded-full text-xs shadow-inner">
          <Sun className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span className="text-stone-400 font-medium">Brahma Muhurta:</span>
          <span className="font-mono text-amber-200 font-semibold">{brahmaTimeFormatted}</span>
        </div>

        {/* Streak Flame Counter */}
        {user && (
          <div className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-950/80 to-amber-900/40 border border-amber-600/50 px-3 py-1.5 rounded-full text-xs text-amber-300 font-semibold shadow-lg shadow-amber-950/30">
            <Flame className="w-4 h-4 text-orange-400 fill-amber-500 animate-bounce" />
            <span className="font-mono">{user.streakCount || 1}</span>
            <span className="hidden sm:inline text-[11px] font-sans text-amber-200/90">Day Streak</span>
          </div>
        )}

        {/* Supporter Badge or Support Button */}
        {user && user.isSupporter ? (
          <div className="flex items-center space-x-1 bg-amber-950/90 border border-amber-500/80 text-amber-300 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{user.supporterBadge || "Sanctuary Supporter"}</span>
          </div>
        ) : (
          <button
            onClick={onOpenDakshina}
            className="flex items-center space-x-1.5 bg-rose-950/70 hover:bg-rose-900/80 border border-rose-800/80 text-rose-200 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-md active:scale-95"
            title="Support Sādhana Platform"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span className="hidden sm:inline">Support Sādhana</span>
          </button>
        )}

        {/* Auth / Guest Status Button */}
        {user && user.email ? (
          <div className="flex items-center space-x-2">
            <div className="hidden xl:flex flex-col text-right">
              <span className="text-xs text-stone-200 font-medium">{user.displayName}</span>
              <span className="text-[9px] text-emerald-400 flex items-center justify-end">
                <UserCheck className="w-2.5 h-2.5 mr-0.5" /> Synced
              </span>
            </div>
            <button
              onClick={onSignOut}
              title="Sign Out"
              className="p-2 rounded-full bg-stone-900 border border-stone-800 hover:border-rose-500/50 text-stone-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-semibold px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 shadow-md shadow-amber-900/40 active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Connect Profile</span>
          </button>
        )}
      </div>
    </header>
  );
};

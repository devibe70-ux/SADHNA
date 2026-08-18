"use client";

import React from "react";
import { X, LogIn, ShieldCheck, Check } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoogleSignIn: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onGoogleSignIn,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-stone-100 shadow-2xl space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-200 p-1.5 rounded-full hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-600 to-orange-400 flex items-center justify-center font-serif text-stone-950 font-bold text-xl mx-auto shadow-lg shadow-amber-900/40">
            ॐ
          </div>
          <h3 className="text-2xl font-serif text-amber-200 font-semibold">Connect Sādhana Profile</h3>
          <p className="text-xs text-stone-400 max-w-xs mx-auto leading-relaxed">
            Sync your Sādhanā streaks, Prakriti profile, and Sankalpa journal entries across all your devices securely.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <button
            onClick={onGoogleSignIn}
            className="w-full flex items-center justify-center space-x-3 bg-white hover:bg-stone-100 text-stone-900 font-semibold py-3 px-6 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full border border-stone-800 text-stone-400 hover:text-stone-200 text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Continue as Guest (Local Offline Mode)
          </button>
        </div>

        <div className="border-t border-stone-800 pt-4 space-y-2 text-[11px] text-stone-400">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Encrypted cloud sync via Firebase Authentication</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Zero commercial ads or tracking trackers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

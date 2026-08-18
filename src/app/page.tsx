"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Navigation, TabId } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { BreathStudio } from "@/components/pranayama/BreathStudio";
import { SoundEngine } from "@/components/sound/SoundEngine";
import { PrakritiQuiz } from "@/components/prakriti/PrakritiQuiz";
import { BrahmaMuhurta } from "@/components/solar/BrahmaMuhurta";
import { ChakraMap } from "@/components/chakras/ChakraMap";
import { SankalpaJournal } from "@/components/journal/SankalpaJournal";
import { StreakEngine } from "@/components/dashboard/StreakEngine";
import { AuthModal } from "@/components/auth/AuthModal";
import { DakshinaModal } from "@/components/payment/DakshinaModal";

import { UserProfile, SessionCategory } from "@/types";
import { getLocalUserProfile } from "@/lib/storage/localStorage";
import { syncFirebaseUserProfile, logPracticeSession } from "@/lib/firebase/dbService";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase/config";
import { signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from "firebase/auth";
import { calculateSolarTimings } from "@/lib/solar/solarCalculator";
import { DoshaScoreResult } from "@/lib/prakriti/doshaEngine";

export default function SadhanaMainApp() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("pranayama");
  const [userDosha, setUserDosha] = useState<DoshaScoreResult | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isDakshinaModalOpen, setIsDakshinaModalOpen] = useState<boolean>(false);
  const [brahmaTimeFormatted, setBrahmaTimeFormatted] = useState<string>("");

  useEffect(() => {
    // 1. Calculate Brahma Muhurta for default location
    const timings = calculateSolarTimings(28.6139, 77.2090, new Date());
    setBrahmaTimeFormatted(timings.formattedBrahma);

    // 2. Initialize user profile (LocalStorage first, then Firebase if configured)
    const initialLocal = getLocalUserProfile();
    setUser(initialLocal);

    if (isFirebaseConfigured && auth) {
      const unsub = onAuthStateChanged(auth, async (fbUser: any) => {
        if (fbUser) {
          const profile = await syncFirebaseUserProfile({
            uid: fbUser.uid,
            displayName: fbUser.displayName,
            email: fbUser.email,
            photoURL: fbUser.photoURL,
          });
          setUser(profile);
        }
      });
      return () => unsub();
    }
  }, []);

  const handleGoogleSignIn = async () => {
    if (!isFirebaseConfigured || !auth || !googleProvider) {
      alert("Firebase is operating in Standalone Mode. Edit .env.local with Firebase credentials to enable cloud OAuth.");
      setIsAuthModalOpen(false);
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
      setIsAuthModalOpen(false);
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  const handleSignOut = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    }
    const guest = getLocalUserProfile();
    setUser(guest);
  };

  const handleLogPractice = async (category: string, title: string, durationSec: number) => {
    if (!user) return;
    const res = await logPracticeSession(
      user.uid,
      category as SessionCategory,
      title,
      durationSec
    );
    setUser(res.profile);
  };

  const handlePaymentSuccess = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#090807] text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
      {/* Top Glassmorphic Navigation Header */}
      <Header
        user={user}
        brahmaTimeFormatted={brahmaTimeFormatted}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenDakshina={() => setIsDakshinaModalOpen(true)}
        onSignOut={handleSignOut}
      />

      {/* Primary Tab Navigation Router */}
      <Navigation
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t)}
        doshaLabel={userDosha ? userDosha.primaryDosha.split(" ")[0] : undefined}
      />

      {/* Main Feature Module Views */}
      <main className="flex-1 px-4 sm:px-6 py-6 max-w-6xl mx-auto w-full">
        {activeTab === "pranayama" && (
          <BreathStudio onLogPractice={handleLogPractice} />
        )}

        {activeTab === "sound" && (
          <SoundEngine />
        )}

        {activeTab === "dosha" && (
          <PrakritiQuiz onQuizComplete={(res) => setUserDosha(res)} />
        )}

        {activeTab === "solar" && (
          <BrahmaMuhurta />
        )}

        {activeTab === "chakras" && (
          <ChakraMap />
        )}

        {activeTab === "journal" && (
          <SankalpaJournal userId={user ? user.uid : "guest_108"} />
        )}

        {activeTab === "dashboard" && user && (
          <StreakEngine user={user} />
        )}
      </main>

      {/* Footer & Sacred Mantra */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onGoogleSignIn={handleGoogleSignIn}
      />

      {/* Razorpay Dakshina Supporter Modal */}
      <DakshinaModal
        isOpen={isDakshinaModalOpen}
        onClose={() => setIsDakshinaModalOpen(false)}
        user={user}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

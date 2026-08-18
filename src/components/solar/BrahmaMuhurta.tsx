"use client";

import React, { useState, useEffect } from "react";
import { calculateSolarTimings, POPULAR_CITIES, SolarTimings } from "@/lib/solar/solarCalculator";
import { LocationSearch } from "./LocationSearch";
import { Sun, Moon, Clock, Compass, Sparkles, CheckCircle2 } from "lucide-react";

export const BrahmaMuhurta: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(POPULAR_CITIES[0]); // Default Varanasi
  const [timings, setTimings] = useState<SolarTimings | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Recalculate solar timings on city or date change
  useEffect(() => {
    const t = calculateSolarTimings(selectedCity.lat, selectedCity.lng, new Date());
    setTimings(t);
  }, [selectedCity]);

  // Live second clock tick
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUseGeolocation = () => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedCity({
            name: `Current Location (${pos.coords.latitude.toFixed(2)}°, ${pos.coords.longitude.toFixed(2)}°)`,
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn("Geolocation denied/error:", err);
        }
      );
    }
  };

  if (!timings) return null;

  // Determine if current time falls within Brahma Muhurta
  const now = currentTime.getTime();
  const isBrahmaActive = now >= timings.brahmaStart.getTime() && now <= timings.brahmaEnd.getTime();
  const isAbhijitActive = now >= timings.abhijitStart.getTime() && now <= timings.abhijitEnd.getTime();

  // Compute countdown to next Brahma Muhurta
  let nextBrahma = timings.brahmaStart;
  if (now > timings.brahmaEnd.getTime()) {
    // Tomorrows Brahma Muhurta
    const tomorrow = new Date(currentTime);
    tomorrow.setDate(tomorrow.getDate() + 1);
    nextBrahma = calculateSolarTimings(selectedCity.lat, selectedCity.lng, tomorrow).brahmaStart;
  }
  const diffMs = Math.max(0, nextBrahma.getTime() - now);
  const hoursLeft = Math.floor(diffMs / (1000 * 60 * 60));
  const minsLeft = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const secsLeft = Math.floor((diffMs % (1000 * 60)) / 1000);

  const fmtTime: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto text-stone-100 shadow-2xl backdrop-blur-xl space-y-8">
      {/* Top Banner & Location Control */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-amber-400" />
              Sūrya Siddhānta Solar Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-amber-200 mt-1 font-bold">
              Brahma Muhurta Astronomical Calculator
            </h2>
          </div>

          <div className="bg-stone-950/80 px-4 py-2 rounded-2xl border border-stone-800/80 font-mono text-center">
            <span className="text-[10px] text-stone-400 block uppercase">Local Time</span>
            <span className="text-sm font-bold text-amber-200">{currentTime.toLocaleTimeString([], fmtTime)}</span>
          </div>
        </div>

        <LocationSearch
          selectedCityName={selectedCity.name}
          onSelectCity={(city) => setSelectedCity(city)}
          onUseGeolocation={handleUseGeolocation}
        />
      </div>

      {/* Main Brahma Muhurta Status Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 relative overflow-hidden ${
          isBrahmaActive
            ? "bg-gradient-to-tr from-amber-950/90 via-amber-900/40 to-orange-950/60 border-amber-400 shadow-2xl shadow-amber-950/50 ring-2 ring-amber-400/40"
            : "bg-stone-950/70 border-stone-800/80"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 bg-amber-950/80 border border-amber-800/60 px-3 py-1 rounded-full text-xs text-amber-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>48-Minute Peak Meditation Window</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-mono font-bold text-amber-200 tracking-tight">
              {timings.formattedBrahma}
            </h3>
            <p className="text-xs text-stone-300 max-w-md">
              Starts exactly 1 Hour 36 Minutes (2 Muhurtas) before local sunrise.
            </p>
          </div>

          {/* Live Countdown Badge */}
          <div className="bg-stone-900/90 border border-stone-800 px-6 py-4 rounded-2xl text-center shadow-xl">
            {isBrahmaActive ? (
              <div className="space-y-1">
                <div className="flex items-center justify-center space-x-1.5 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>NOW ACTIVE</span>
                </div>
                <p className="text-xs text-amber-200">Auspicious Dhyāna Window Open!</p>
              </div>
            ) : (
              <div>
                <span className="text-[10px] text-stone-400 uppercase font-mono tracking-widest block">Countdown to Next</span>
                <div className="text-2xl font-mono font-bold text-amber-400 my-0.5">
                  {hoursLeft.toString().padStart(2, "0")}:{minsLeft.toString().padStart(2, "0")}:{secsLeft.toString().padStart(2, "0")}
                </div>
                <span className="text-[10px] text-stone-400">Pre-Dawn Window</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Auxiliary Solar Timings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80 space-y-1">
          <span className="text-stone-400 flex items-center gap-1.5">
            <Sun className="w-3.5 h-3.5 text-amber-400" /> Local Sunrise
          </span>
          <span className="text-base font-bold text-amber-200 block">{timings.formattedSunrise}</span>
        </div>

        <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80 space-y-1">
          <span className="text-stone-400 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" /> Abhijit Muhurta
          </span>
          <span className="text-base font-bold text-amber-200 block">{timings.formattedAbhijit}</span>
          <span className="text-[10px] text-stone-500 font-sans block">Midday Auspicious Peak</span>
        </div>

        <div className="bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80 space-y-1">
          <span className="text-stone-400 flex items-center gap-1.5">
            <Moon className="w-3.5 h-3.5 text-indigo-400" /> Local Sunset
          </span>
          <span className="text-base font-bold text-amber-200 block">{timings.formattedSunset}</span>
        </div>
      </div>

      {/* Spiritual Insight */}
      <div className="bg-stone-950/40 p-5 rounded-2xl border border-stone-800/60 text-xs text-stone-300 space-y-2 leading-relaxed font-sans">
        <h4 className="font-serif text-amber-300 font-semibold text-sm">Spiritual Significance of Brahma Muhurta</h4>
        <p>
          "Brahma" translates to divine knowledge, and "Muhurta" signifies a 48-minute period of time. In classical Ayurvedic texts (*Aṣṭāṅga Hṛdayam*), rising during Brahma Muhurta harmonizes the pineal gland, purifies the subtle energy channels (*Nāḍīs*), and maximizes atmospheric Sattva Guna for effortless meditation.
        </p>
      </div>
    </div>
  );
};

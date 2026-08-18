import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sādhana — Sanatan Healing & Meditation Web Platform",
  description: "Authentic Vedic breathwork (Prānāyāma), harmonic sound therapy (Nāda Yoga & Solfeggio frequencies), Prakriti Ayurvedic constitution analysis, and daily Sādhanā ritual accountability.",
  keywords: [
    "Sadhana",
    "Sanatan Healing",
    "Vedic Meditation",
    "Pranayama Breathwork",
    "Solfeggio Frequencies",
    "Prakriti Quiz",
    "Dosha Assessment",
    "Brahma Muhurta Calculator",
    "7 Chakras Map",
    "Sankalpa Journal",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090807] text-stone-100 min-h-screen selection:bg-amber-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}

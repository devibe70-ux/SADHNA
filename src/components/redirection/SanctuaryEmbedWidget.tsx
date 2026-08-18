"use client";

import React, { useState } from "react";
import { ExternalLink, Code, Sparkles, Copy, Check, ShieldCheck, ArrowRight } from "lucide-react";

interface SanctuaryEmbedWidgetProps {
  appUrl?: string;
}

export const SanctuaryEmbedWidget: React.FC<SanctuaryEmbedWidgetProps> = ({
  appUrl = "https://sadhana-sanatan.vercel.app",
}) => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"banner" | "iframe" | "button">("banner");

  const iframeSnippet = `<iframe src="${appUrl}" width="100%" height="800px" style="border:none; border-radius: 24px; overflow:hidden;" title="Sādhana Sanatan Healing & Meditation Program"></iframe>`;

  const buttonSnippet = `<a href="${appUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; background:#ea580c; color:#fff; padding:12px 24px; border-radius:9999px; text-decoration:none; font-weight:bold; font-family:sans-serif;">🌸 Launch Sādhana Healing Program &rarr;</a>`;

  const currentSnippet = activeTab === "iframe" ? iframeSnippet : buttonSnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl backdrop-blur-xl space-y-6 max-w-4xl mx-auto">
      {/* Title & Program Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 bg-amber-950/70 border border-amber-800/60 px-3.5 py-1 rounded-full text-xs text-amber-300 font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Site Integration & Redirection Widget</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-amber-200 font-bold mt-1">
            Embed or Redirect Sādhana as a Program on Your Main Site
          </h2>
          <p className="text-xs text-stone-400 max-w-xl mt-1 leading-relaxed">
            Run Sādhana as an official Sanatan Healing & Dhyāna program on your primary website using redirect buttons, portal banners, or embedded iframes.
          </p>
        </div>

        <a
          href={appUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-extrabold px-5 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg shrink-0 self-start sm:self-center"
        >
          <span>Open Program Portal</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Embedded Program Banner Preview */}
      <div className="bg-gradient-to-r from-stone-950 via-amber-950/40 to-stone-950 border border-amber-500/40 rounded-2xl p-6 relative overflow-hidden shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold">
              Official Partner Program
            </span>
            <h3 className="text-xl font-serif text-amber-100 font-bold">
              Sādhana — Sanatan Breathwork & Sound Healing Program
            </h3>
            <p className="text-xs text-stone-300 max-w-md">
              Prānāyāma Studio, 10 Solfeggio Frequencies, Ayurvedic Prakriti Profiling, & Brahma Muhurta Timings.
            </p>
          </div>

          <a
            href={appUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold px-6 py-3 rounded-full text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95 shrink-0"
          >
            <span>Begin Sādhana Program</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Code Snippet Generator */}
      <div className="bg-stone-950/80 p-5 rounded-2xl border border-stone-800/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Code className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase font-semibold text-amber-300">
              Redirection Code Snippet for Main Website
            </span>
          </div>

          <div className="flex space-x-1.5">
            {[
              { id: "iframe", label: "Full iFrame Embed" },
              { id: "button", label: "Redirect Button" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`px-3 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                  activeTab === t.id
                    ? "bg-amber-600 text-stone-950 font-bold"
                    : "bg-stone-900 text-stone-400 hover:bg-stone-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <pre className="bg-stone-900 border border-stone-800 p-4 rounded-xl text-stone-300 text-[11px] font-mono overflow-x-auto whitespace-pre-wrap">
            {currentSnippet}
          </pre>
          <button
            onClick={handleCopy}
            className="absolute top-3 right-3 flex items-center space-x-1 px-3 py-1 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] font-semibold transition-colors border border-stone-700"
          >
            {copiedCode ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 text-amber-400" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

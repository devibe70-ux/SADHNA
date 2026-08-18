"use client";

import React from "react";
import { SankalpaEntry } from "@/types";
import { Calendar, Tag, Trash2, Heart } from "lucide-react";

interface JournalCardProps {
  entry: SankalpaEntry;
  onDelete: (id: string) => void;
}

export const JournalCard: React.FC<JournalCardProps> = ({ entry, onDelete }) => {
  const dateStr = new Date(entry.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-stone-900/90 border border-stone-800/90 rounded-2xl p-5 text-stone-100 shadow-xl space-y-3 relative group hover:border-amber-500/40 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-amber-950/70 border border-amber-800/50 text-amber-300 font-semibold">
            {entry.category}
          </span>
          <span className="text-xs text-stone-400 font-mono flex items-center gap-1">
            <Calendar className="w-3 h-3 text-stone-500" />
            {dateStr}
          </span>
        </div>

        <button
          onClick={() => onDelete(entry.id)}
          className="text-stone-500 hover:text-rose-400 p-1 rounded hover:bg-stone-800 transition-colors opacity-0 group-hover:opacity-100"
          title="Delete Entry"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <p className="text-sm font-serif italic text-amber-100 leading-relaxed">
        "{entry.intention}"
      </p>

      {entry.gratitudeNote && (
        <div className="bg-stone-950/60 p-3 rounded-xl border border-stone-800/80 text-xs space-y-1">
          <span className="text-amber-400/90 font-medium flex items-center gap-1 text-[11px]">
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> Daily Gratitude:
          </span>
          <p className="text-stone-300 font-sans">{entry.gratitudeNote}</p>
        </div>
      )}

      {entry.tags && entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {entry.tags.map((t, idx) => (
            <span
              key={idx}
              className="inline-flex items-center text-[10px] text-stone-400 bg-stone-950 px-2 py-0.5 rounded-md border border-stone-800"
            >
              <Tag className="w-2.5 h-2.5 text-amber-400 mr-1" />
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

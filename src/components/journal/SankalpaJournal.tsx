"use client";

import React, { useState, useEffect } from "react";
import { SankalpaEntry } from "@/types";
import { JournalCard } from "./JournalCard";
import { getLocalSankalpaEntries, saveLocalSankalpaEntry, deleteLocalSankalpaEntry } from "@/lib/storage/localStorage";
import { addSankalpaEntry } from "@/lib/firebase/dbService";
import { BookOpen, Plus, Sparkles, Search, CheckCircle } from "lucide-react";

interface SankalpaJournalProps {
  userId: string;
}

export const SankalpaJournal: React.FC<SankalpaJournalProps> = ({ userId }) => {
  const [entries, setEntries] = useState<SankalpaEntry[]>([]);
  const [intention, setIntention] = useState<string>("");
  const [category, setCategory] = useState<SankalpaEntry["category"]>("clarity");
  const [gratitude, setGratitude] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("Sadhana, Peace");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  useEffect(() => {
    // Load persisted entries
    const loaded = getLocalSankalpaEntries();
    setEntries(loaded);
  }, []);

  const handleCreateEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intention.trim()) return;

    setIsSubmitting(true);
    const tags = tagInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newEntry = await addSankalpaEntry(userId, {
      userId,
      intention: intention.trim(),
      category,
      gratitudeNote: gratitude.trim() || undefined,
      tags,
    });

    setEntries((prev) => [newEntry, ...prev]);
    setIntention("");
    setGratitude("");
    setIsSubmitting(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 3000);
  };

  const handleDeleteEntry = (id: string) => {
    deleteLocalSankalpaEntry(id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const filteredEntries = entries.filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      e.intention.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q) ||
      (e.gratitudeNote && e.gratitudeNote.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Create Sankalpa Form Card */}
      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center space-x-2 text-amber-400">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <h2 className="text-2xl font-serif text-amber-200 font-semibold">
            Sankalpa & Intention Journal
          </h2>
        </div>
        <p className="text-xs text-stone-400 max-w-xl">
          In Sanatan philosophy, a *Sankalpa* is a solemn vow formed in the heart during quiet meditation. Record your daily intention, mood, and gratitude.
        </p>

        <form onSubmit={handleCreateEntry} className="space-y-4 pt-2">
          {/* Intention Prompt */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-amber-300 font-semibold">
              Today's Solemn Sankalpa (Intention) *
            </label>
            <textarea
              required
              rows={3}
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="e.g. 'I remain centered in equanimity, patient with all beings, and dedicated to my daily 20-minute breathwork Sādhanā.'"
              className="w-full bg-stone-950/80 border border-stone-800 text-stone-200 rounded-2xl p-3.5 text-xs focus:outline-none focus:border-amber-500 font-serif leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-stone-400">Category Pillar</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-stone-950/80 border border-stone-800 text-stone-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="clarity">Mental Clarity (Jñāna)</option>
                <option value="healing">Physical & Energetic Healing</option>
                <option value="discipline">Practice Discipline (Tapas)</option>
                <option value="devotion">Bhakti & Devotion</option>
                <option value="peace">Peace & Equanimity (Śānti)</option>
              </select>
            </div>

            {/* Tags Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-stone-400">Tags (Comma Separated)</label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Pranayama, Grounding, Gratitude"
                className="w-full bg-stone-950/80 border border-stone-800 text-stone-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Gratitude Note */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono uppercase text-stone-400">Daily Gratitude Reflection (Optional)</label>
            <input
              type="text"
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              placeholder="e.g. Grateful for morning sunshine, clean water, and peaceful mind."
              className="w-full bg-stone-950/80 border border-stone-800 text-stone-200 text-xs rounded-xl p-2.5 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {justAdded ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Sankalpa entry saved securely!
              </span>
            ) : (
              <span className="text-[11px] text-stone-500">Encrypted in local / Cloud Firestore</span>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !intention.trim()}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider transition-all disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              <span>Record Sankalpa</span>
            </button>
          </div>
        </form>
      </div>

      {/* Entry History & Filter List */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-serif text-amber-200 font-semibold">
            Journal Timeline ({filteredEntries.length})
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search intentions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-900 border border-stone-800 text-stone-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="text-center py-12 bg-stone-900/40 border border-stone-800/60 rounded-3xl text-stone-400 space-y-2">
            <Sparkles className="w-8 h-8 text-amber-400/60 mx-auto" />
            <p className="text-xs">No Sankalpa entries found. Record your first intention above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEntries.map((entry) => (
              <JournalCard key={entry.id} entry={entry} onDelete={handleDeleteEntry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

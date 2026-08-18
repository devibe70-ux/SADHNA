"use client";

import React, { useState } from "react";
import { DOSHA_QUESTIONS, calculatePrakriti, Dosha, DoshaScoreResult, QuestionOption } from "@/lib/prakriti/doshaEngine";
import { PrakritiResults } from "./PrakritiResults";
import { ArrowRight, Sparkles } from "lucide-react";

interface PrakritiQuizProps {
  onQuizComplete: (result: DoshaScoreResult) => void;
}

export const PrakritiQuiz: React.FC<PrakritiQuizProps> = ({ onQuizComplete }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: Dosha }>({});
  const [result, setResult] = useState<DoshaScoreResult | null>(null);

  const currentQuestion = DOSHA_QUESTIONS[currentIndex];
  const progressPct = Math.round(((currentIndex + 1) / DOSHA_QUESTIONS.length) * 100);

  const handleSelectOption = (dosha: Dosha) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: dosha };
    setAnswers(updatedAnswers);

    if (currentIndex < DOSHA_QUESTIONS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      const calculated = calculatePrakriti(updatedAnswers);
      setResult(calculated);
      onQuizComplete(calculated);
    }
  };

  const handleRetake = () => {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    return <PrakritiResults result={result} onRetakeQuiz={handleRetake} />;
  }

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-10 max-w-xl mx-auto text-stone-100 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Top Header & Progress */}
      <div className="mb-6 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono text-stone-400">
          <span className="uppercase tracking-wider flex items-center gap-1.5 text-amber-400 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Question {currentIndex + 1} of {DOSHA_QUESTIONS.length}
          </span>
          <span>{progressPct}% Complete</span>
        </div>
        <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden border border-stone-800/80 p-0.5">
          <div
            className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Category Badge & Question Prompt */}
      <div className="space-y-2 my-6">
        <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-amber-950/70 border border-amber-800/50 text-amber-300 font-semibold">
          {currentQuestion.category} Evaluation
        </span>
        <h3 className="text-xl sm:text-2xl font-serif text-amber-100 font-semibold leading-relaxed">
          {currentQuestion.prompt}
        </h3>
      </div>

      {/* Option Buttons */}
      <div className="space-y-3 mt-6">
        {currentQuestion.options.map((opt: QuestionOption, i: number) => (
          <button
            key={i}
            onClick={() => handleSelectOption(opt.dosha)}
            className="w-full text-left p-4 rounded-2xl bg-stone-950/70 hover:bg-amber-950/40 border border-stone-800 hover:border-amber-500/50 transition-all duration-200 text-xs sm:text-sm text-stone-200 leading-snug flex items-center justify-between group shadow-sm hover:scale-[1.01]"
          >
            <div>
              <span className="font-medium text-stone-100 block">{opt.text}</span>
              <span className="text-[11px] text-stone-400 mt-0.5 block font-sans">{opt.detail}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-500 group-hover:text-amber-400 shrink-0 ml-3 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
};

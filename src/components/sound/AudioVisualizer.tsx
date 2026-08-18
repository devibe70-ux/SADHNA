"use client";

import React, { useEffect, useRef } from "react";
import { audioSingleton } from "@/lib/audio/webAudioEngine";

export const AudioVisualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animFrameId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      animFrameId = requestAnimationFrame(render);

      const analyser = audioSingleton.getAnalyser();
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      if (!analyser) {
        // Render resting ambient wave
        ctx.fillStyle = "rgba(245, 158, 11, 0.2)";
        for (let i = 0; i < 16; i++) {
          const barHeight = Math.sin(Date.now() * 0.003 + i) * 6 + 10;
          ctx.fillRect(i * 12 + 10, height - barHeight, 6, barHeight);
        }
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      const barWidth = (width / bufferLength) * 1.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * height;

        const gradient = ctx.createLinearGradient(0, height, 0, 0);
        gradient.addColorStop(0, "rgba(217, 119, 6, 0.8)");
        gradient.addColorStop(0.5, "rgba(245, 158, 11, 1)");
        gradient.addColorStop(1, "rgba(253, 230, 138, 1)");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth - 2, barHeight);

        x += barWidth;
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <div className="w-full bg-stone-950/80 border border-stone-800/80 rounded-2xl p-4 flex items-center justify-between">
      <div className="text-xs space-y-0.5">
        <span className="text-amber-300 font-semibold uppercase tracking-wider text-[10px]">Real-Time Spectrum</span>
        <p className="text-stone-400 text-[11px]">AudioContext Analyser Visualizer</p>
      </div>
      <canvas
        ref={canvasRef}
        width={240}
        height={48}
        className="rounded-lg bg-stone-900/60 border border-stone-800"
      />
    </div>
  );
};

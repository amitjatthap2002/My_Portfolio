"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import TerminalDrawer from "@/components/TerminalDrawer";
import ChatbotWidget from "@/components/ChatbotWidget";
import MusicSynth from "@/components/MusicSynth";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function PortfolioShell({ children }: { children: ReactNode }) {
  const [konamiBuffer, setKonamiBuffer] = useState<string[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setKonamiBuffer((prev) => {
      const next = [...prev, e.key].slice(-KONAMI_SEQUENCE.length);
      if (next.join(",") === KONAMI_SEQUENCE.join(",")) {
        setShowEasterEgg(true);
        setTimeout(() => setShowEasterEgg(false), 4000);
        return [];
      }
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-500">
      <BackgroundCanvas />
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
      <CommandPalette />
      <TerminalDrawer />
      <ChatbotWidget />
      <MusicSynth />

      {showEasterEgg && (
        <div className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: i % 3 === 0 ? "#8b5cf6" : i % 3 === 1 ? "#06b6d4" : "#f59e0b",
                  animationDelay: `${Math.random() * 1}s`,
                  animationDuration: `${0.5 + Math.random()}s`,
                  opacity: Math.random(),
                }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-card px-10 py-8 rounded-2xl text-center space-y-3 border-zinc-800 shadow-2xl bg-zinc-950/95">
                <div className="text-4xl">🚀</div>
                <h2 className="text-lg font-bold text-zinc-100 tracking-tight">Konami Code Activated!</h2>
                <p className="text-xs text-zinc-400 font-mono">You found Amit's hidden easter egg. Nice moves!</p>
                <div className="flex justify-center gap-1 pt-1">
                  {KONAMI_SEQUENCE.map((key, idx) => (
                    <kbd
                      key={idx}
                      className="text-[9px] font-mono bg-zinc-900 border border-zinc-700 text-zinc-300 px-1.5 py-0.5 rounded"
                    >
                      {key === "ArrowUp" ? "↑" : key === "ArrowDown" ? "↓" : key === "ArrowLeft" ? "←" : key === "ArrowRight" ? "→" : key.toUpperCase()}
                    </kbd>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

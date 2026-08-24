"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicSynth() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const intervalIdRef = useRef<number | null>(null);
  const currentChordIndexRef = useRef(0);

  // Frequencies for a spacey chord progression
  // Am9 -> Fmaj9 -> Cmaj9 -> G6/9
  const chords = [
    [110.00, 164.81, 196.00, 246.94, 329.63], // A2, E3, G3, B3, E4
    [87.31, 130.81, 174.61, 220.00, 261.63],  // F2, C3, F3, A3, C4
    [130.81, 196.00, 246.94, 293.66, 392.00], // C3, G3, B3, D4, G4
    [98.00, 146.83, 196.00, 220.00, 293.66],  // G2, D3, G3, A3, D4
  ];

  const initAudio = () => {
    if (audioCtxRef.current) return;

    // Create AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Create a lowpass filter for that warm "underwater" sound
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, ctx.currentTime);
    filter.Q.setValueAtTime(1.5, ctx.currentTime);

    // Create delay line for spacey echo
    const delay = ctx.createDelay(1.0);
    delay.delayTime.setValueAtTime(0.4, ctx.currentTime);

    const delayGain = ctx.createGain();
    delayGain.gain.setValueAtTime(0.35, ctx.currentTime);

    // Connect delay loop (feedback)
    delay.connect(delayGain);
    delayGain.connect(delay);

    // Create master gain
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime); // start silent
    masterGainRef.current = masterGain;

    // Route: Oscillators -> Filter -> masterGain -> destination
    // Route: Filter -> Delay -> delayGain -> masterGain -> destination
    filter.connect(masterGain);
    filter.connect(delay);
    delayGain.connect(masterGain);
    masterGain.connect(ctx.destination);
  };

  const playChord = (frequencies: number[]) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Stop current oscillators
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
      } catch (e) {}
    });
    oscillatorsRef.current = [];

    // Create lowpass filter node in route
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    // slow LFO filter sweep (between 300Hz and 650Hz)
    const time = ctx.currentTime;
    filter.frequency.setValueAtTime(350 + Math.sin(time) * 100, time);
    filter.frequency.exponentialRampToValueAtTime(550 + Math.sin(time) * 100, time + 4.5);
    filter.connect(masterGainRef.current!);

    // Play new oscillators
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      // soft triangle wave for a cozy synthesizer vibe
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Volume envelope: fade in
      oscGain.gain.setValueAtTime(0, ctx.currentTime);
      // stagger notes slightly
      const stagger = i * 0.05;
      oscGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.5 + stagger);
      // slow fade out towards the end of chord cycle
      oscGain.gain.setValueAtTime(0.08, ctx.currentTime + 3.8);
      oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.0);

      osc.connect(oscGain);
      oscGain.connect(filter);
      
      osc.start(ctx.currentTime + stagger);
      osc.stop(ctx.currentTime + 5.0);
      oscillatorsRef.current.push(osc);
    });
  };

  const startMusic = async () => {
    initAudio();
    const ctx = audioCtxRef.current!;
    
    // Resume context if suspended (browser security)
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    // Fade in master gain
    masterGainRef.current!.gain.cancelScheduledValues(ctx.currentTime);
    masterGainRef.current!.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 2.0);

    // Play first chord immediately
    currentChordIndexRef.current = 0;
    playChord(chords[0]);

    // Setup repeating schedule every 5 seconds
    let nextChordTime = window.setInterval(() => {
      currentChordIndexRef.current = (currentChordIndexRef.current + 1) % chords.length;
      playChord(chords[currentChordIndexRef.current]);
    }, 5000);

    intervalIdRef.current = nextChordTime as unknown as number;
    setIsPlaying(true);
  };

  const stopMusic = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }

    const ctx = audioCtxRef.current;
    if (ctx && masterGainRef.current) {
      // Fade out master gain
      masterGainRef.current.gain.cancelScheduledValues(ctx.currentTime);
      masterGainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      
      // Stop oscillators after fade out completes
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop();
          } catch (e) {}
        });
        oscillatorsRef.current = [];
      }, 550);
    }
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic().catch(console.error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop();
        } catch (e) {}
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(console.error);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        onClick={togglePlayback}
        className="flex items-center gap-2 px-3 py-2 rounded-full glass-card hover:bg-zinc-800/40 text-xs font-mono tracking-wider text-zinc-400 hover:text-primary transition-all duration-300 shadow-lg cursor-pointer"
        aria-label="Toggle background ambient music"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 bg-primary rounded-full animate-[soundWave_0.8s_infinite_ease-in-out_alternate]" style={{ height: "60%" }} />
              <span className="w-0.5 bg-primary rounded-full animate-[soundWave_0.5s_infinite_ease-in-out_alternate]" style={{ height: "100%", animationDelay: "0.1s" }} />
              <span className="w-0.5 bg-primary rounded-full animate-[soundWave_0.7s_infinite_ease-in-out_alternate]" style={{ height: "40%", animationDelay: "0.2s" }} />
              <span className="w-0.5 bg-primary rounded-full animate-[soundWave_0.6s_infinite_ease-in-out_alternate]" style={{ height: "80%", animationDelay: "0.3s" }} />
            </span>
            <span className="text-[10px]">AMBIENT: ON</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
            <span className="text-[10px] text-zinc-500">AMBIENT: MUTED</span>
          </>
        )}
      </button>

      {/* Embedded CSS for soundwave animation */}
      <style jsx global>{`
        @keyframes soundWave {
          0% { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

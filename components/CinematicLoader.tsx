"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CinematicLoaderProps {
  onComplete: () => void;
}

export default function CinematicLoader({ onComplete }: CinematicLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const statuses = [
    "INITIALIZING PORTFOLIO KERNEL...",
    "ESTABLISHING SECURE WEB INTERFACES...",
    "LOADING INTERACTIVE TECH GALAXY...",
    "SYNTHESIZING AMBIENT AUDIO NODES...",
    "COMPILING CLIENT COMPONENTS...",
    "WELCOME TO AMIT'S SPACE."
  ];

  useEffect(() => {
    // Increment progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        // Random increment to feel realistic
        const increment = Math.floor(Math.random() * 8) + 2;
        return Math.min(100, prev + increment);
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Cycle through status messages
    if (progress < 20) setStatusIndex(0);
    else if (progress < 40) setStatusIndex(1);
    else if (progress < 60) setStatusIndex(2);
    else if (progress < 80) setStatusIndex(3);
    else if (progress < 95) setStatusIndex(4);
    else setStatusIndex(5);
  }, [progress]);

  useEffect(() => {
    if (progress === 100) {
      // Hold welcome message for 600ms before fading out
      const delay = setTimeout(() => {
        setIsVisible(false);
        const completeDelay = setTimeout(() => {
          onComplete();
        }, 600); // match framer-motion exit duration
        return () => clearTimeout(completeDelay);
      }, 700);
      return () => clearTimeout(delay);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950 font-mono text-zinc-400"
        >
          {/* Cybernetic grid overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03),transparent_60%)] pointer-events-none" />
          
          <div className="flex flex-col items-center max-w-xs w-full space-y-8 px-4 text-center">
            {/* Geometric SVG Logo */}
            <motion.div
              initial={{ rotate: 0, scale: 0.9 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="relative w-16 h-16 flex items-center justify-center"
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pulse-glow-effect"
              >
                <path
                  d="M32 2L62 20V50L32 62L2 50V20L32 2Z"
                  stroke="#8b5cf6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-primary"
                />
                <path
                  d="M32 14L48 24V40L32 48L16 40V24L32 14Z"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-secondary"
                />
                <circle cx="32" cy="32" r="4" fill="#8b5cf6" className="fill-primary" />
              </svg>
            </motion.div>

            {/* Percentage Indicator */}
            <div className="space-y-1">
              <motion.span
                key={progress}
                initial={{ opacity: 0.5, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-extrabold tracking-widest text-zinc-100"
              >
                {progress}%
              </motion.span>
              
              {/* Progress bar */}
              <div className="h-[2px] w-48 bg-zinc-800 rounded-full overflow-hidden mt-2 relative">
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

            {/* Changing status logs */}
            <div className="h-6">
              <AnimatePresence mode="wait">
                <motion.p
                  key={statusIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-[10px] tracking-wider text-zinc-500 uppercase"
                >
                  {statuses[statusIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

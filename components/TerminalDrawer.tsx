"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minimize2, Maximize2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

interface HistoryLine {
  text: string;
  type: "input" | "output" | "system" | "error";
}

export default function TerminalDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>([
    { text: "Amit.Dev [Version 1.0.4] System Terminal Console Node", type: "system" },
    { text: "Copyright (c) 2026 Jatthap Labs. All rights reserved.", type: "system" },
    { text: "Type 'help' to see list of available commands.", type: "system" },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Listen to toggle event
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => !prev);
    };
    window.addEventListener("toggle-terminal-drawer", handleToggle);
    return () => window.removeEventListener("toggle-terminal-drawer", handleToggle);
  }, []);

  // Autofocus input on open or history change
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, history]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { text: `guest@amitjatthap.dev:~$ ${cmd}`, type: "input" as const }];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    let reply: HistoryLine[] = [];

    switch (trimmed) {
      case "help":
        reply = [
          { text: "Available commands:", type: "output" },
          { text: "  about       - Tell me about Amit Jatthap", type: "output" },
          { text: "  projects    - Show portfolio projects & showcases", type: "output" },
          { text: "  skills      - List core engineering skillsets", type: "output" },
          { text: "  contact     - Display emails & social coordinates", type: "output" },
          { text: "  github      - View top repository & followers stats", type: "output" },
          { text: "  leetcode    - Fetch competitive programming metrics", type: "output" },
          { text: "  resume      - Download Amit's resume PDF", type: "output" },
          { text: "  clear       - Clear terminal logs screen", type: "output" },
          { text: "  exit        - Close the interactive console panel", type: "output" },
        ];
        break;

      case "about":
        reply = [
          { text: `Profile: ${portfolioData.personalInfo.name}`, type: "output" },
          { text: `Title: ${portfolioData.personalInfo.title}`, type: "output" },
          { text: `Bio: ${portfolioData.personalInfo.bio}`, type: "output" },
          { text: `Journey: ${portfolioData.personalInfo.journey}`, type: "output" },
          { text: `Career Goal: ${portfolioData.personalInfo.careerGoal}`, type: "output" },
          { text: `Location: ${portfolioData.personalInfo.location}`, type: "output" },
        ];
        break;

      case "skills":
        reply = [{ text: "Core Technologies & Levels:", type: "output" }];
        portfolioData.skills.forEach((cat) => {
          reply.push({ text: `--- ${cat.category} ---`, type: "output" });
          cat.items.forEach((skill) => {
            reply.push({ text: `  ${skill.name.padEnd(15)} : ${skill.level}% [${"█".repeat(Math.round(skill.level / 10))}${"░".repeat(10 - Math.round(skill.level / 10))}]`, type: "output" });
          });
        });
        break;

      case "projects":
        reply = [{ text: "Premium Showcases:", type: "output" }];
        portfolioData.projects.forEach((proj) => {
          reply.push({ text: `• [${proj.status.toUpperCase()}] ${proj.name} - ${proj.tagline}`, type: "output" });
          reply.push({ text: `  Desc: ${proj.description}`, type: "output" });
          reply.push({ text: `  Stack: ${proj.techStack.join(", ")}`, type: "output" });
          reply.push({ text: `  Github: ${proj.githubUrl}`, type: "output" });
          reply.push({ text: " ", type: "output" });
        });
        break;

      case "contact":
        reply = [
          { text: "Contact Credentials:", type: "output" },
          { text: `  Email:    ${portfolioData.personalInfo.email}`, type: "output" },
          { text: `  GitHub:   ${portfolioData.personalInfo.github}`, type: "output" },
          { text: `  LinkedIn: ${portfolioData.personalInfo.linkedin}`, type: "output" },
          { text: `  LeetCode: ${portfolioData.personalInfo.leetcode}`, type: "output" },
        ];
        break;

      case "github":
        reply = [
          { text: "GitHub API Sync Profile Data:", type: "output" },
          { text: `  Repositories : ${portfolioData.githubStats.repositories}`, type: "output" },
          { text: `  Stars        : ${portfolioData.githubStats.stars}`, type: "output" },
          { text: `  Followers    : ${portfolioData.githubStats.followers}`, type: "output" },
          { text: `  Top Languages: ${portfolioData.githubStats.topLanguages.map(l => `${l.name} (${l.percentage}%)`).join(", ")}`, type: "output" },
        ];
        break;

      case "leetcode":
        reply = [
          { text: "LeetCode Dashboard Metrics:", type: "output" },
          { text: `  Total Solved : ${portfolioData.leetcodeStats.totalSolved} / ${portfolioData.leetcodeStats.totalQuestions}`, type: "output" },
          { text: `    - Easy     : ${portfolioData.leetcodeStats.easySolved}`, type: "output" },
          { text: `    - Medium   : ${portfolioData.leetcodeStats.mediumSolved}`, type: "output" },
          { text: `    - Hard     : ${portfolioData.leetcodeStats.hardSolved}`, type: "output" },
          { text: `  Contest Rtg  : ${portfolioData.leetcodeStats.contestRating}`, type: "output" },
          { text: `  Global Rank  : ${portfolioData.leetcodeStats.globalRank}`, type: "output" },
        ];
        break;

      case "resume":
        reply = [
          { text: "Starting file download stream...", type: "output" },
          { text: "Download successful. Resume exported as Amit_Jatthap_Resume.pdf.", type: "output" },
        ];
        alert("Downloading Resume... (Amit_Jatthap_Resume.pdf)");
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
        setIsOpen(false);
        setInput("");
        return;

      default:
        reply = [
          { text: `shell: command not found: ${trimmed}. Type 'help' to see list of valid routines.`, type: "error" },
        ];
        break;
    }

    setHistory([...newHistory, ...reply]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%", opacity: 0.8 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0.8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`fixed bottom-0 left-0 right-0 z-[800] bg-zinc-950/95 font-mono border-t border-zinc-800 shadow-2xl transition-all duration-300 ${
            isMaximized ? "top-0 h-full" : "h-[380px]"
          }`}
        >
          {/* CRT Screen Scanline Layer */}
          <div className="crt-screen absolute inset-0 flex flex-col pointer-events-none z-[11] opacity-35" />

          {/* Terminal Bar */}
          <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between z-20 relative select-none">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={() => setIsOpen(false)} />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              <span className="text-[10px] text-zinc-500 font-medium ml-2">guest@amitjatthap.dev ~ /shell</span>
            </div>
            
            {/* Header controls */}
            <div className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300">
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="p-1 rounded hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Logs View */}
          <div
            ref={scrollRef}
            onClick={() => inputRef.current?.focus()}
            className="flex-1 overflow-y-auto p-4 space-y-1.5 text-xs text-green-400 bg-[#020202] flex flex-col h-[calc(100%-38px)] z-10 relative cursor-text no-scrollbar"
          >
            {history.map((line, idx) => {
              let style = "";
              if (line.type === "system") style = "text-zinc-500";
              else if (line.type === "input") style = "text-zinc-300 font-bold";
              else if (line.type === "error") style = "text-red-400";
              
              return (
                <div key={idx} className={`${style} whitespace-pre-wrap`}>
                  {line.text}
                </div>
              );
            })}

            {/* Input Line */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-zinc-300 font-bold shrink-0">guest@amitjatthap.dev:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-0 outline-none text-green-300 caret-green-400 p-0 m-0 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

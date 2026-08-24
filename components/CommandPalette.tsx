"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, SunMoon, User, Briefcase, Award, Library, MessageSquareCode, Award as LeetcodeIcon, FileText, X } from "lucide-react";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Command items
  const commands = [
    { label: "Go to About Section", icon: User, action: () => scrollToSection("about"), shortcut: "G A" },
    { label: "Go to Skills Section", icon: Award, action: () => scrollToSection("skills"), shortcut: "G S" },
    { label: "Go to Projects Section", icon: Briefcase, action: () => scrollToSection("projects"), shortcut: "G P" },
    { label: "Go to Education Section", icon: FileText, action: () => scrollToSection("education"), shortcut: "G E" },
    { label: "Go to Knowledge Library", icon: Library, action: () => scrollToSection("library"), shortcut: "G L" },
    { label: "Go to Contact Section", icon: MessageSquareCode, action: () => scrollToSection("contact"), shortcut: "G C" },
    { label: "Switch Theme (Light / Dark)", icon: SunMoon, action: () => toggleTheme(), shortcut: "T T" },
    { label: "Toggle Terminal Console", icon: Terminal, action: () => triggerTerminal(), shortcut: "T C" },
    { label: "Toggle AI Assistant", icon: MessageSquareCode, action: () => triggerChatbot(), shortcut: "T A" },
    { label: "Download Resume", icon: FileText, action: () => downloadResume(), shortcut: "D R" },
    { label: "Open GitHub Profile", icon: GithubIcon, action: () => window.open("https://github.com/amitjatthap", "_blank"), shortcut: "O G" },
    { label: "Open LinkedIn Profile", icon: LinkedinIcon, action: () => window.open("https://linkedin.com/in/amit-jatthap", "_blank"), shortcut: "O L" },
    { label: "Open LeetCode Profile", icon: LeetcodeIcon, action: () => window.open("https://leetcode.com/u/amitjatthap", "_blank"), shortcut: "O C" },
  ];

  // Filter commands by search
  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  // Listening for Ctrl+K and toggle-command-palette events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleToggleEvent = () => {
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-command-palette", handleToggleEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-command-palette", handleToggleEvent);
    };
  }, []);

  // Autofocus input when palette opens
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Handle arrow key and enter key navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    }
  };

  // Action methods
  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const toggleTheme = () => {
    setIsOpen(false);
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const triggerTerminal = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("toggle-terminal-drawer"));
  };

  const triggerChatbot = () => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent("toggle-chatbot"));
  };

  const downloadResume = () => {
    setIsOpen(false);
    alert("Starting Resume PDF download... (Amit_Jatthap_Resume.pdf)");
  };

  // Close when clicking outside the dialog card
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={handleBackdropClick}
          className="fixed inset-0 z-[999] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            ref={containerRef}
            className="glass-card max-w-lg w-full rounded-xl overflow-hidden shadow-2xl border-zinc-800 bg-zinc-950/95 flex flex-col max-h-[450px]"
          >
            {/* Header / Input */}
            <div className="flex items-center border-b border-zinc-800/80 px-4 py-3 gap-3">
              <Terminal className="w-4 h-4 text-zinc-500" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                placeholder="Search command palette..."
                className="flex-1 bg-transparent border-0 outline-none text-zinc-200 text-sm placeholder-zinc-600 focus:ring-0 focus:outline-none"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Command List */}
            <div className="overflow-y-auto flex-1 p-2 no-scrollbar">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, idx) => {
                  const Icon = command.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <button
                      key={command.label}
                      onClick={() => command.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs transition-colors duration-150 cursor-pointer ${
                        isSelected
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-zinc-400 hover:bg-zinc-900/40 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-zinc-500"}`} />
                        <span>{command.label}</span>
                      </div>
                      <kbd className="text-[9px] font-mono bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 group-hover:text-zinc-400">
                        {command.shortcut}
                      </kbd>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-8 text-xs text-zinc-500 font-mono">
                  No commands found matching "{search}"
                </div>
              )}
            </div>

            {/* Footer hints */}
            <div className="border-t border-zinc-800/80 px-4 py-2 flex items-center justify-between text-[10px] text-zinc-600 font-mono bg-zinc-950/40">
              <div className="flex gap-2">
                <span>↑↓ navigate</span>
                <span>•</span>
                <span>enter select</span>
              </div>
              <span>esc close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

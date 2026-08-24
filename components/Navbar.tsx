"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Moon, Sun, Terminal, Search, Menu, X } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [greeting, setGreeting] = useState("Hello");
  const [timeStr, setTimeStr] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Nav items matching the section routes
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Projects", href: "/projects" },
    { label: "Education", href: "/education" },
    { label: "Library", href: "/library" },
    { label: "Contact", href: "/contact" },
  ];

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  // Scroll Progress and active section styling
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live Clock and dynamic greeting
  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const now = new Date();
      const hours = now.getHours();
      
      // Clock string (HH:MM:SS)
      const pad = (n: number) => n.toString().padStart(2, "0");
      setTimeStr(`${pad(hours)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`);

      // Greeting
      if (hours < 12) setGreeting("Good Morning");
      else if (hours < 18) setGreeting("Good Afternoon");
      else setGreeting("Good Evening");
    };

    updateTimeAndGreeting();
    const interval = setInterval(updateTimeAndGreeting, 1000);
    return () => clearInterval(interval);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Dispatch events to toggle utilities
  const triggerCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("toggle-command-palette"));
  };

  const triggerTerminalDrawer = () => {
    window.dispatchEvent(new CustomEvent("toggle-terminal-drawer"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Scroll indicator bar */}
      <div className="w-full h-[3px] bg-zinc-800/40 relative">
        <div
          className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary to-secondary transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main glass nav bar */}
      <nav className="glass-panel border-t-0 border-x-0 h-16 px-6 md:px-12 flex items-center justify-between shadow-md">
        
        {/* Left: Brand/Logo & Greeting */}
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer font-bold tracking-wider text-sm md:text-base text-zinc-100"
          >
            <span className="bg-gradient-to-r from-primary to-secondary w-6 h-6 rounded flex items-center justify-center text-xs text-white font-mono shadow-md">A</span>
            <span className="text-foreground hover:opacity-85 transition-opacity">AMIT.DEV</span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-2 border-l border-zinc-800/60 pl-6 text-xs text-zinc-500 font-mono">
            <span>{greeting}, Amit</span>
            <span className="opacity-40">•</span>
            <span className="text-zinc-400 font-medium tabular-nums">{timeStr}</span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-foreground hover:bg-zinc-800/20 cursor-pointer transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions (Terminal, Search, Theme, Hamburger) */}
        <div className="flex items-center gap-2 md:gap-3">
          
          {/* Cmd Palette search shortcut */}
          <button
            onClick={triggerCommandPalette}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800/50 bg-zinc-900/30 text-xs font-mono text-zinc-500 hover:text-zinc-300 hover:border-zinc-700/80 cursor-pointer transition-all duration-200"
            title="Search command menu (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="hidden sm:inline-block text-[9px] bg-zinc-800 px-1 py-0.5 rounded text-zinc-400">Ctrl+K</kbd>
          </button>

          {/* Terminal Drawer trigger */}
          <button
            onClick={triggerTerminalDrawer}
            className="p-2 rounded-lg hover:bg-zinc-800/30 text-zinc-400 hover:text-primary transition-colors cursor-pointer"
            title="Open Interactive Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-zinc-800/30 text-zinc-400 hover:text-primary transition-colors cursor-pointer"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800/30 text-zinc-400 hover:text-foreground transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </nav>

      {/* Mobile Drawer menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 glass-panel border-x-0 border-b border-zinc-800/60 p-6 space-y-4 shadow-xl z-40 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="w-full text-left py-2 px-3 rounded-lg text-sm text-zinc-400 hover:text-foreground hover:bg-zinc-800/30 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="h-[1px] bg-zinc-800/40" />

          {/* Clock for mobile */}
          <div className="flex justify-between items-center px-3 text-xs text-zinc-500 font-mono">
            <span>{greeting}, Amit</span>
            <span className="text-zinc-400 tabular-nums">{timeStr}</span>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Rocket, Mail, Code2 } from "lucide-react";

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const [showRocket, setShowRocket] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowRocket(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    setLaunching(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setLaunching(false), 1200);
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Skills", href: "/skills" },
    { label: "Projects", href: "/projects" },
    { label: "Education", href: "/education" },
    { label: "Library", href: "/library" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative border-t border-zinc-800/60 bg-zinc-950/70 backdrop-blur-md mt-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-10">

        {/* Top row: brand + nav + socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* Brand block */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-zinc-100">
              <span className="w-6 h-6 rounded bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-xs text-white font-mono shadow-md">A</span>
              AMIT.DEV
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[220px]">
              {portfolioData.personalInfo.tagline}
            </p>
            <div className="flex gap-3 pt-1">
              {[
                { href: portfolioData.personalInfo.github, icon: GithubIcon, label: "GitHub" },
                { href: portfolioData.personalInfo.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
                { href: portfolioData.personalInfo.leetcode, icon: Code2, label: "LeetCode" },
                { href: `mailto:${portfolioData.personalInfo.email}`, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-zinc-800/60 hover:border-zinc-700 bg-zinc-900/20 hover:bg-zinc-900/50 text-zinc-500 hover:text-primary transition-all"
                  title={label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Quick Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-zinc-400 hover:text-primary transition-colors cursor-pointer font-sans"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Coordinates</h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-mono">
              <li>{portfolioData.personalInfo.email}</li>
              <li>{portfolioData.personalInfo.location}</li>
              <li className="text-emerald-500/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available for new opportunities
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar: copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-zinc-900 pt-6 text-[10px] font-mono text-zinc-600">
          <span>© 2026 Amit Jatthap. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Built with
            <span className="text-primary">Next.js 16</span> ·
            <span className="text-secondary">Framer Motion</span> ·
            <span className="text-zinc-400">Tailwind CSS</span>
          </span>
        </div>
      </div>

      {/* Rocket Scroll-to-top button */}
      <AnimatePresence>
        {showRocket && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-20 z-[850] w-10 h-10 rounded-full border border-zinc-800 bg-zinc-950/90 text-zinc-400 hover:text-primary hover:border-primary flex items-center justify-center shadow-xl transition-all cursor-pointer"
            title="Back to top"
          >
            <motion.div
              animate={launching ? { y: [-2, -20], opacity: [1, 0] } : { y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Rocket className={`w-4 h-4 ${launching ? "text-primary" : ""}`} />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

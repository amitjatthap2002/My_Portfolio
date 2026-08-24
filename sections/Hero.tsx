"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, FileDown, Mail, Code2 } from "lucide-react";

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
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const [typedRole, setTypedRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = ["Full Stack Engineer", "AI/ML Developer", "System Architect"];
  
  // Mouse tracking for cursor glow effect
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(glowX, springConfig);
  const springY = useSpring(glowY, springConfig);
  const heroRef = useRef<HTMLDivElement>(null);

  // Typewriter effect for titles
  useEffect(() => {
    let currentText = "";
    let isDeleting = false;
    let index = 0;
    let timer: NodeJS.Timeout;

    const type = () => {
      const activeRole = roles[roleIndex];
      if (isDeleting) {
        currentText = activeRole.substring(0, currentText.length - 1);
      } else {
        currentText = activeRole.substring(0, currentText.length + 1);
      }

      setTypedRole(currentText);

      let speed = isDeleting ? 40 : 85;

      if (!isDeleting && currentText === activeRole) {
        speed = 2200; // wait at complete word
        isDeleting = true;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        setRoleIndex((prev) => (prev + 1) % roles.length);
        speed = 500; // pause before typing next
      }

      timer = setTimeout(type, speed);
    };

    type();
    return () => clearTimeout(timer);
  }, [roleIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    glowX.set(e.clientX - rect.left - 150); // offset half of glow size
    glowY.set(e.clientY - rect.top - 150);
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const elPosition = elRect - bodyRect;
      window.scrollTo({
        top: elPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden grid-bg"
    >
      {/* Floating glow blob matching cursor */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 blur-[90px] pointer-events-none z-0 hidden md:block"
        style={{
          left: springX,
          top: springY,
        }}
      />

      {/* Decorative blurred structural rings */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-primary/3 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-secondary/3 blur-[120px] pointer-events-none" />

      {/* Main Content Grid */}
      <div className="relative max-w-5xl w-full flex flex-col items-center justify-center text-center space-y-8 z-10">
        
        {/* Top Tagline Badges */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/40 text-[10px] tracking-widest text-zinc-400 font-mono uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          AVAILABLE FOR FULL TIME OPPORTUNITIES
        </motion.div>

        {/* Big Headline */}
        <div className="space-y-4 max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
          >
            I am{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:shimmer-text">
              {portfolioData.personalInfo.name}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-10 text-xl sm:text-2xl md:text-3xl font-mono text-zinc-300 font-medium flex items-center justify-center gap-1.5"
          >
            <span>building</span>
            <span className="text-secondary border-r-2 border-secondary animate-pulse pr-1">
              {typedRole}
            </span>
          </motion.div>
        </div>

        {/* Short introduction */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-xl text-zinc-400 text-sm sm:text-base leading-relaxed font-sans"
        >
          {portfolioData.personalInfo.tagline} {portfolioData.personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 pt-2"
        >
          <button
            onClick={() => scrollToId("projects")}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium text-xs tracking-wider uppercase cursor-pointer hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 transition-all"
          >
            View Projects
          </button>
          
          <button
            onClick={() => {
              alert("Downloading Resume PDF... (Amit_Jatthap_Resume.pdf)");
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full glass-card hover:bg-zinc-800/40 text-zinc-300 hover:text-white font-medium text-xs tracking-wider uppercase cursor-pointer transition-all"
          >
            <FileDown className="w-4 h-4 text-primary" />
            Resume
          </button>
          
          <button
            onClick={() => scrollToId("contact")}
            className="px-6 py-3 rounded-full glass-card hover:bg-zinc-800/40 text-zinc-300 hover:text-white font-medium text-xs tracking-wider uppercase cursor-pointer transition-all"
          >
            Contact
          </button>
        </motion.div>

        {/* Social Icons Panel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center gap-5 pt-8"
        >
          <a
            href={portfolioData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-zinc-800/60 bg-zinc-900/20 text-zinc-400 hover:text-foreground hover:border-zinc-700 hover:bg-zinc-900/60 transition-all cursor-pointer"
            title="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href={portfolioData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-zinc-800/60 bg-zinc-900/20 text-zinc-400 hover:text-foreground hover:border-zinc-700 hover:bg-zinc-900/60 transition-all cursor-pointer"
            title="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href={portfolioData.personalInfo.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full border border-zinc-800/60 bg-zinc-900/20 text-zinc-400 hover:text-foreground hover:border-zinc-700 hover:bg-zinc-900/60 transition-all cursor-pointer"
            title="LeetCode"
          >
            <Code2 className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${portfolioData.personalInfo.email}`}
            className="p-2.5 rounded-full border border-zinc-800/60 bg-zinc-900/20 text-zinc-400 hover:text-foreground hover:border-zinc-700 hover:bg-zinc-900/60 transition-all cursor-pointer"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Downward Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer z-10 text-zinc-500 hover:text-zinc-300 transition-colors"
        onClick={() => scrollToId("about")}
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}

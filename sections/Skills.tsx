"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, Skill } from "@/data/portfolio";
import { Cpu, Terminal, Compass } from "lucide-react";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const categories = portfolioData.skills.map((s) => s.category);

  // Skill items in currently active category
  const activeSkills = portfolioData.skills.find(
    (s) => s.category === activeCategory
  )?.items || [];

  // Orbital Galaxy data: list of 10 primary skills mapped onto orbital coordinates
  const galaxySkills = [
    { name: "Gen AI", radius: 55, speed: 18, angleOffset: 0, level: 95 },
    { name: "RAG", radius: 55, speed: 18, angleOffset: Math.PI, level: 90 },
    { name: "Agentic AI", radius: 85, speed: 12, angleOffset: Math.PI / 4, level: 85 },
    { name: "Deep Learning", radius: 85, speed: 12, angleOffset: (5 * Math.PI) / 4, level: 88 },
    { name: "Machine Learning", radius: 115, speed: 9, angleOffset: Math.PI / 2, level: 92 },
  ];

  return (
    <section id="skills" className="py-24 px-6 md:px-12 max-w-6xl mx-auto space-y-16">
      
      {/* Title */}
      <div className="space-y-2">
        <span className="text-xs font-mono tracking-widest text-secondary uppercase">02 / CORE CAPABILITIES</span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Skills & Tech Galaxy</h2>
      </div>





      {/* Galaxy & Tab selector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Tech Galaxy Orbit Visualizer */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-72 h-72 sm:w-[380px] sm:h-[380px] rounded-full glass-card bg-zinc-900/60 border border-primary/20 shadow-[0_0_40px_-10px_rgba(147,51,234,0.3)] flex items-center justify-center overflow-hidden">
            
            {/* Center Node: AMIT CORE */}
            <div className="absolute z-20 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-zinc-950 border border-primary/40 shadow-[0_0_20px_var(--primary-glow)] select-none">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-pulse" />
              <span className="text-[8px] font-mono text-zinc-500 font-bold mt-1">CORE</span>
            </div>



            <div className="absolute bottom-4 left-4 right-4 z-20 h-10 flex items-center justify-center font-mono">
              {hoveredSkill ? (
                <div className="text-center text-xs border border-zinc-800 bg-zinc-950/90 px-3 py-1.5 rounded-lg w-full flex justify-between items-center shadow-lg">
                  <span className="text-zinc-200 font-bold">{hoveredSkill.name}</span>
                  <span className="text-primary font-bold">{hoveredSkill.level}% proficiency</span>
                </div>
              ) : (
                <div className="text-[10px] text-zinc-500 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-zinc-600 animate-spin" />
                  Hover galaxy nodes to inspect skills
                </div>
              )}
            </div>

            {/* Orbit paths and spinning nodes */}
            <svg viewBox="0 0 320 320" className="w-full h-full absolute inset-0 z-10 text-primary/40">
              {/* Orbits lines */}
              <circle cx="160" cy="160" r="55" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />
              <circle cx="160" cy="160" r="85" stroke="currentColor" strokeWidth="0.8" fill="none" />
              <circle cx="160" cy="160" r="115" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 4" fill="none" />

              {/* Dynamic Orbit Nodes */}
              {galaxySkills.map((node) => {
                // Inline anim config using keyframes for SVG rotation
                const safeName = node.name.replace(/[^a-zA-Z0-9]/g, "-");
                const rotateKeyframes = `
                  @keyframes orbit-${safeName} {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `;
                return (
                  <g key={node.name}>
                    <style>{rotateKeyframes}</style>
                    <g
                      style={{
                        transformOrigin: "160px 160px",
                        animation: `orbit-${safeName} ${node.speed}s linear infinite`,
                      }}
                    >
                      <circle
                        cx={160 + node.radius * Math.cos(node.angleOffset)}
                        cy={160 + node.radius * Math.sin(node.angleOffset)}
                        r="6"
                        className="fill-secondary hover:fill-primary stroke-background cursor-pointer hover:scale-150 transition-all duration-300 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
                        onMouseEnter={() => setHoveredSkill({ name: node.name, level: node.level, iconName: "" })}
                        onMouseLeave={() => setHoveredSkill(null)}
                      />
                      
                      {/* Name tags labels text floating alongside dots */}
                      <text
                        x={160 + node.radius * Math.cos(node.angleOffset) + 10}
                        y={160 + node.radius * Math.sin(node.angleOffset) + 3}
                        className="fill-zinc-200 font-mono text-[9px] font-bold tracking-wide uppercase select-none pointer-events-none hover:fill-white drop-shadow-md"
                      >
                        {node.name}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Side: Categorized Tabs & Level Cards */}
        <div className="lg:col-span-6 space-y-6">
          {/* Tabs header list */}
          <div className="flex flex-wrap gap-1.5 border-b border-zinc-800/40 pb-4">
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/30"
                      : "text-zinc-500 hover:text-zinc-300 bg-zinc-900/10 border border-transparent"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Tab contents grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="wait">
              {activeSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="glass-card p-4 rounded-xl space-y-3 relative group"
                >
                  {/* Skill header */}
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-zinc-200">{skill.name}</span>
                    <span className="font-mono text-zinc-500 group-hover:text-primary transition-colors">{skill.level}%</span>
                  </div>

                  {/* Skill meter slider */}
                  <div className="h-1.5 w-full bg-zinc-800/60 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary/80 to-secondary/80 rounded-full group-hover:from-primary group-hover:to-secondary transition-all"
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

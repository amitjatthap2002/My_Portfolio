"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData, Project } from "@/data/portfolio";
import { 
  ExternalLink, 
  X, 
  Cpu, 
  Layers, 
  Sparkles 
} from "lucide-react";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Recommendations matching
  const filteredProjects = portfolioData.projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "ai-ml") {
      return p.techStack.some((t) => ["LangGraph", "FastAPI", "Python", "TensorFlow", "Qdrant"].includes(t));
    }
    if (filter === "frontend") {
      return p.techStack.some((t) => ["React", "Next.js", "Tailwind CSS", "GLSL Shaders"].includes(t));
    }
    if (filter === "backend") {
      return p.techStack.some((t) => ["FastAPI", "PostgreSQL", "Node.js", "Docker"].includes(t));
    }
    if (filter === "full-stack") {
      return p.techStack.includes("Next.js") && p.techStack.includes("PostgreSQL") || p.techStack.includes("LangGraph");
    }
    return true;
  });

  // 3D Tilt Card implementation
  const TiltCard = ({ project }: { project: Project }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top; // y position within element
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      // Calculate rotation (max 10 degrees)
      setRotateX((yc - y) / 15);
      setRotateY((x - xc) / 15);
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };

    const renderProjectVisual = (project: Project) => {
      if (project.imageUrl) {
        return (
          <div className="absolute inset-0 bg-zinc-950">
            <img src={project.imageUrl} alt={project.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        );
      }

      return (
        <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center p-4">
          <Cpu className="w-10 h-10 text-zinc-800 animate-pulse" />
        </div>
      );
    };

    return (
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="glass-card rounded-2xl overflow-hidden h-[380px] flex flex-col justify-between transition-all duration-100 ease-out select-none cursor-pointer"
        onClick={() => setActiveProject(project)}
      >
        {/* Top: Custom Visual Display */}
        <div className="h-44 w-full relative border-b border-zinc-900 overflow-hidden bg-zinc-950">
          {renderProjectVisual(project)}
          <span className="absolute top-3 right-3 text-[9px] font-mono bg-zinc-900/90 border border-zinc-850 px-2 py-0.5 rounded-full text-zinc-400 uppercase tracking-wider">
            {project.status}
          </span>
        </div>

        {/* Bottom: Info summary */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-zinc-100 tracking-tight">{project.name}</h3>
            <p className="text-[11px] text-zinc-500 font-medium font-mono">{project.tagline}</p>
            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-1">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80 text-zinc-500"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[9px] font-mono px-1.5 py-0.5 text-zinc-650">+{project.techStack.length - 4}</span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-24 px-6 md:px-12 max-w-6xl mx-auto space-y-12">
      
      {/* Title & Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-primary uppercase">03 / PRODUCT PORTFOLIO</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Projects</h2>
        </div>

        {/* Filter chips recommendation */}
        <div className="flex flex-wrap gap-1 bg-zinc-900/40 border border-zinc-800/60 p-1 rounded-full self-start">
          {[
            { label: "All Works", id: "all" },
            { label: "AI / Agents", id: "ai-ml" },
            { label: "Frontend", id: "frontend" },
            { label: "Backend", id: "backend" },
            { label: "Full Stack", id: "full-stack" },
          ].map((chip) => (
            <button
              key={chip.id}
              onClick={() => setFilter(chip.id)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-wider transition-colors cursor-pointer ${
                filter === chip.id
                  ? "bg-primary text-white"
                  : "text-zinc-500 hover:text-zinc-350"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <TiltCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Expanded Project Details Overlay Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="glass-card max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl bg-zinc-950/95 border-zinc-800 border flex flex-col max-h-[90vh]"
            >
              
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-zinc-900 bg-zinc-900/20 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 border border-zinc-800 bg-zinc-950 px-2 py-0.5 rounded uppercase">
                    {activeProject.status}
                  </span>
                  <h3 className="text-base font-bold text-zinc-100 tracking-tight mt-1">
                    {activeProject.name}
                  </h3>
                </div>
                
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details contents */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
                
                {/* Description */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Project Overview
                  </span>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {activeProject.detailedDescription}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-secondary" /> Core Features
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
                    {activeProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">▪</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges & Learnings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-900/10 border border-zinc-900 rounded-xl p-4">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Challenges Faced</span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{activeProject.challenges}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase">Key Learnings</span>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{activeProject.learnings}</p>
                  </div>
                </div>

                {/* Architecture Flowchart */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-primary" /> Architecture Nodes
                  </span>
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-zinc-950/60 border border-zinc-900 rounded-xl">
                    {activeProject.architecture.map((node, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-[10px] font-mono text-zinc-300">
                          {node}
                        </span>
                        {idx < activeProject.architecture.length - 1 && (
                          <span className="text-zinc-650 text-xs font-mono">→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA options */}
              <div className="p-4 border-t border-zinc-900 bg-zinc-900/30 flex justify-end gap-3 z-10 relative">
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/20 text-xs font-medium text-zinc-400 hover:text-zinc-200 transition-colors"
                >
                  <GithubIcon className="w-4 h-4" /> Codebase
                </a>
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-xs font-medium text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

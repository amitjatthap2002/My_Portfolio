"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, Calendar, GraduationCap, Flame } from "lucide-react";
import PhotoUploadCard from "@/components/PhotoUploadCard";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  const { stats, name, bio, journey, careerGoal, profileImageUrl } = portfolioData.personalInfo;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, cubicBezier: [0.16, 1, 0.3, 1] } },
  };

  const statItems = [
    { label: "Years Coding", value: stats.educationYears, icon: Flame, color: "text-amber-500" },
    { label: "Completed Projects", value: stats.projectsCompleted, icon: Briefcase, color: "text-primary" },
    { label: "Tech Stack Skills", value: stats.technologiesCount, icon: Award, color: "text-secondary" },
    { label: "Certifications", value: stats.certificationsCount, icon: GraduationCap, color: "text-emerald-500" },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto space-y-16">
      
      {/* Title */}
      <div className="space-y-2">
        <span className="text-xs font-mono tracking-widest text-primary uppercase">01 / DISCOVERY</span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">About Me</h2>
      </div>

      {/* Main Grid: Visual & Bio */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Side: SVG Portrait Visual */}
        <div className="md:col-span-5 flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="w-64 sm:w-80"
          >
            <PhotoUploadCard
              label="About photo"
              description="Upload a portrait or profile image for the About section."
              initialSrc={portfolioData.personalInfo.sectionImageUrls?.about || profileImageUrl}
              alt={`${name} portrait`}
              previewClassName="h-64 sm:h-80 w-full object-cover"
              className="glass-card"
            />
          </motion.div>
        </div>

        {/* Right Side: Bio text */}
        <div className="md:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-zinc-300 text-sm leading-relaxed"
          >
            <p className="font-semibold text-zinc-100 text-base">
              Hi, I'm {name}. I craft scalable systems and high-fidelity frontend templates.
            </p>
            <p>{bio}</p>
            <p>{journey}</p>
            
            <div className="border-l-2 border-primary pl-4 py-1.5 my-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-primary block">Career Vision</span>
              <p className="text-zinc-200 italic text-xs">{careerGoal}</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Grid: Animated Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-5 rounded-xl flex flex-col justify-between h-32 relative"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs text-zinc-500 font-mono tracking-wider">{stat.label}</span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-3xl font-extrabold tracking-tight text-zinc-100">
                {stat.value}+
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Journey Timeline */}
      <div className="space-y-6 pt-4">
        <h3 className="text-lg font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          Education & Core Milestones
        </h3>
        
        <div className="space-y-4 border-l border-zinc-800 ml-3.5 pl-6 relative">
          
          {/* Milestone 1 */}
          <div className="relative">
            {/* Timeline Dot */}
            <span className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-primary border-4 border-background ring-4 ring-primary/20" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                2020 - 2024
              </span>
              <h4 className="text-xs font-bold text-zinc-100 uppercase">Bachelor of Engineering – Computer Engineering</h4>
              <p className="text-xs text-zinc-400">Savitribai Phule Pune University (SPPU)</p>
              <p className="text-[11px] text-zinc-500">Graduated with first-class honors. Focused on Distributed Systems, Web Architectures, and Neural Networks.</p>
            </div>
          </div>

          {/* Milestone 2 */}
          <div className="relative">
            {/* Timeline Dot */}
            <span className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-secondary border-4 border-background ring-4 ring-secondary/20" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                2024 - 2025
              </span>
              <h4 className="text-xs font-bold text-zinc-100 uppercase">RAG Pipelines & Vector Databases Architecting</h4>
              <p className="text-xs text-zinc-400">Vercel & DeepLearning.AI Academy</p>
              <p className="text-[11px] text-zinc-500">Obtained certificates in cloud deployments. Specialized in creating semantic caching structures and multi-agent pipelines.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

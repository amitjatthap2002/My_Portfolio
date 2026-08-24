"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, CheckSquare } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Education() {
  const educationItems = portfolioData.education;

  return (
    <section id="education" className="py-24 px-6 md:px-12 max-w-4xl mx-auto space-y-16">
      
      {/* Title */}
      <div className="space-y-2">
        <span className="text-xs font-mono tracking-widest text-primary uppercase">04 / HISTORY</span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Education</h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/60">
        <img src={portfolioData.personalInfo.sectionImageUrls?.education || portfolioData.personalInfo.profileImageUrl} alt="Education photo space" className="h-40 w-full object-cover" />
      </div>



      {/* Timeline Layout */}
      <div className="relative border-l border-zinc-800 ml-4 md:ml-6 pl-8 md:pl-10 space-y-16 py-4">
        
        {educationItems.map((edu, idx) => {
          const isFirst = idx === 0;
          return (
            <motion.div
              key={edu.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative space-y-4"
            >
              {/* Chronological Circle Indicator */}
              <span className={`absolute -left-[41px] md:-left-[49px] top-1 w-6 h-6 rounded-full flex items-center justify-center border-4 border-background shadow-lg transition-colors ${
                isFirst 
                  ? "bg-primary ring-4 ring-primary/20 text-white" 
                  : "bg-zinc-900 border-zinc-800 text-zinc-500"
              }`}>
                <GraduationCap className="w-2.5 h-2.5" />
              </span>

              {/* Card Meta */}
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5" /> {edu.duration}
                </span>
                
                <h3 className="text-base sm:text-lg font-bold text-zinc-100 flex flex-wrap items-baseline gap-2">
                  <span>{edu.position}</span>
                  <span className="text-xs text-zinc-500 font-normal">at</span>
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-sm sm:text-base font-bold">
                    {edu.company}
                  </span>
                </h3>
              </div>

              {/* Card body & bullets */}
              <div className="glass-card p-5 rounded-2xl border-zinc-800/80 bg-zinc-950/60 shadow-xl space-y-4">
                <ul className="space-y-3">
                  {edu.workDone.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-xs text-zinc-400 leading-relaxed font-sans">
                      <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags footer */}
                <div className="h-[1px] bg-zinc-900" />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {edu.skillsUsed.map((skill) => (
                    <span
                      key={skill}
                      className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-850/80 text-zinc-400 group-hover:text-primary transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { Star, ExternalLink, Bookmark } from "lucide-react";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("all");
  const resources = portfolioData.knowledgeLibrary.slice(0, 3);

  // Filter chips mapping
  const tabs = [
    { label: "All Items", id: "all" },
    { label: "Books", id: "book" },
    { label: "Courses", id: "course" },
    { label: "Research Papers", id: "research paper" },
    { label: "Documentation", id: "documentation" },
    { label: "Blogs & Tools", id: "blog-tool" },
  ];

  const filteredResources = resources.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "blog-tool") {
      return ["Blog", "Tool", "Video"].includes(item.category);
    }
    return item.category.toLowerCase() === activeTab;
  });

  return (
    <section id="library" className="py-24 px-6 md:px-12 max-w-6xl mx-auto space-y-12">
      
      {/* Title & Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-secondary uppercase">05 / REPOSITORY</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">My Knowledge Library</h2>
        </div>

        {/* Categories Chips */}
        <div className="flex flex-wrap gap-1 bg-zinc-900/40 border border-zinc-800/60 p-1 rounded-full self-start">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "bg-secondary text-black font-bold"
                  : "text-zinc-500 hover:text-zinc-350"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/60 h-40 md:h-48 flex items-center justify-center group">
        <img 
          src={portfolioData.personalInfo.sectionImageUrls?.library || portfolioData.personalInfo.profileImageUrl} 
          alt="Library photo space" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/50 to-zinc-950/90" />
        
        <div className="relative z-10 text-center px-6 md:px-12 max-w-3xl">
          <p className="text-lg md:text-2xl font-serif italic text-zinc-100 leading-relaxed shadow-black drop-shadow-md">
            "A reader lives a thousand lives before he dies. The man who never reads lives only one."
          </p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-secondary/50"></span>
            <p className="text-xs md:text-sm font-mono text-secondary tracking-widest uppercase shadow-black drop-shadow-md">George R.R. Martin</p>
            <span className="w-8 h-px bg-secondary/50"></span>
          </div>
        </div>
      </div>



      {/* Grid of Resource Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredResources.map((item) => (
            <motion.div
              key={item.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col h-[280px] shadow-xl group border-zinc-850"
            >
              {/* Top Cover Visual */}
              <div className={`h-28 w-full bg-gradient-to-r ${item.coverColor} relative p-4 flex flex-col justify-between border-b border-zinc-900 overflow-hidden`}>
                {item.coverImageUrl ? (
                  <img src={item.coverImageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
                ) : null}
                {/* Visual grid overlay */}
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_30%,rgba(0,0,0,0.6))] pointer-events-none" />

                <div className="flex justify-between items-center z-10">
                  <span className="text-[8px] font-mono tracking-widest text-white/70 uppercase bg-black/30 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                    {item.category}
                  </span>
                  <Bookmark className="w-3.5 h-3.5 text-white/55 group-hover:text-white transition-colors" />
                </div>
                
                <h4 className="text-sm font-bold text-white tracking-tight z-10 drop-shadow-md line-clamp-2 leading-snug">
                  {item.title}
                </h4>
              </div>

              {/* Bottom reviews/rating */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-zinc-950/20">
                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed font-sans">
                  {item.review}
                </p>

                <div className="flex justify-between items-center border-t border-zinc-900 pt-3 z-10 relative">
                  {/* Stars Display */}
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-3.5 h-3.5 ${
                          idx < item.rating ? "text-amber-500 fill-amber-500" : "text-zinc-700"
                        }`}
                      />
                    ))}
                  </div>

                  {/* External Resource link or Description */}
                  {item.link.startsWith("http") ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[10px] font-mono text-zinc-500 hover:text-secondary hover:underline transition-colors"
                    >
                      Explore <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-zinc-400">
                      {item.link}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

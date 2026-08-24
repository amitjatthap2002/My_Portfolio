"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ExternalLink, GitCommit, GitBranch, Code2, Award } from "lucide-react";

const GithubIcon = ({ className = "w-4.5 h-4.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function Dashboards() {
  const [lc, setLc] = useState(portfolioData.leetcodeStats);
  const [gh, setGh] = useState(portfolioData.githubStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        // Fetch Github Data
        const githubUsername = portfolioData.personalInfo.github.split("/").pop();
        if (githubUsername) {
          try {
            const [ghRes, eventsRes] = await Promise.all([
              fetch(`https://api.github.com/users/${githubUsername}`),
              fetch(`https://api.github.com/users/${githubUsername}/events?per_page=10`)
            ]);

            let newGhData: any = {};
            
            if (ghRes.ok) {
              const ghData = await ghRes.json();
              newGhData.followers = ghData.followers;
              newGhData.following = ghData.following;
              newGhData.repositories = ghData.public_repos;
            }

            if (eventsRes.ok) {
              const eventsData = await eventsRes.json();
              if (Array.isArray(eventsData) && eventsData.length > 0) {
                newGhData.recentActivity = eventsData.slice(0, 4).map((ev: any) => {
                  let desc = ev.type.replace('Event', '');
                  if (ev.type === 'PushEvent') desc = `Pushed ${ev.payload?.commits?.length || 1} commit(s)`;
                  else if (ev.type === 'CreateEvent') desc = `Created ${ev.payload?.ref_type || 'repository'}`;
                  else if (ev.type === 'WatchEvent') desc = `Starred the repository`;
                  else if (ev.type === 'ForkEvent') desc = `Forked the repository`;
                  else if (ev.type === 'PullRequestEvent') desc = `${ev.payload?.action} pull request`;
                  else if (ev.type === 'IssuesEvent') desc = `${ev.payload?.action} issue`;

                  return {
                    repo: ev.repo.name.split('/').pop() || ev.repo.name,
                    type: ev.type,
                    date: new Date(ev.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                    description: desc
                  };
                });
              }
            }

            setGh((prev) => ({
              ...prev,
              ...newGhData,
            }));
          } catch (e) {
            console.error("Error fetching github data", e);
          }
        }

        // Fetch LeetCode Data (Using Alfa LeetCode API proxy as fallback)
        const leetcodeUsername = portfolioData.personalInfo.leetcode.split("/").filter(Boolean).pop();
        if (leetcodeUsername) {
          const lcRes = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/profile`);
          if (lcRes.ok) {
            const lcData = await lcRes.json();
            if (lcData && !lcData.errors && lcData.totalSolved !== undefined) {
              setLc((prev) => ({
                ...prev,
                totalSolved: lcData.totalSolved || prev.totalSolved,
                totalQuestions: lcData.totalQuestions || prev.totalQuestions,
                easySolved: lcData.easySolved || prev.easySolved,
                easyTotal: lcData.totalEasy || prev.easyTotal,
                mediumSolved: lcData.mediumSolved || prev.mediumSolved,
                mediumTotal: lcData.totalMedium || prev.mediumTotal,
                hardSolved: lcData.hardSolved || prev.hardSolved,
                hardTotal: lcData.totalHard || prev.hardTotal,
                contestRating: lcData.ranking || prev.contestRating, // use ranking as contest rating might be different
              }));
            }
          }
        }
      } catch (error) {
        console.error("Error fetching live stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveStats();
  }, []);

  // Render contribution grid (7 days x 28 columns for visual compact grid)
  const renderContributionGrid = () => {
    const grid: number[] = [];
    const intensities = [0, 1, 0, 2, 0, 1, 3, 2, 1, 0, 0, 4, 3, 1, 2, 0, 1, 2, 3, 0, 1, 0, 2, 3, 1, 0, 2, 1];
    
    // Generate contribution levels (0 to 4)
    for (let c = 0; c < 28; c++) {
      for (let r = 0; r < 7; r++) {
        // Pseudo-random but consistent grid intensity matching Github greens
        const idx = (c * 7 + r) % intensities.length;
        grid.push(intensities[idx]);
      }
    }

    const getColorClass = (val: number) => {
      switch (val) {
        case 1: return "bg-[#0e4429] outline outline-1 outline-white/5";
        case 2: return "bg-[#006d32] outline outline-1 outline-white/5";
        case 3: return "bg-[#26a641] outline outline-1 outline-white/5";
        case 4: return "bg-[#39d353] outline outline-1 outline-white/5";
        default: return "bg-[#161b22] outline outline-1 outline-white/5";
      }
    };

    const getPastMonths = () => {
      const months = [];
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        months.push(d.toLocaleDateString('en-US', { month: 'short' }));
      }
      return months;
    };
    const monthLabels = getPastMonths();

    return (
      <div className="w-full flex flex-col">
        <div className="flex justify-between text-[9px] text-zinc-500 font-mono px-1 mb-1">
          {monthLabels.map((m, i) => <span key={i}>{m}</span>)}
        </div>
        <div className="grid grid-flow-col grid-rows-7 gap-1 w-full overflow-x-auto no-scrollbar pb-2">
          {grid.map((val, idx) => (
            <div key={idx} className={`w-2.5 h-2.5 rounded-[2px] transition-all duration-300 hover:scale-125 ${getColorClass(val)}`} />
          ))}
        </div>
      </div>
    );
  };

  // Helper to calculate circular ring stroke-dashoffset
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const ratioSolved = lc.totalSolved / lc.totalQuestions;
  const strokeDashoffset = circumference - (ratioSolved * circumference);

  return (
    <section id="dashboards" className="py-24 px-6 md:px-12 max-w-6xl mx-auto space-y-16">
      
      {/* Title */}
      <div className="space-y-2 text-center md:text-left">
        <span className="text-xs font-mono tracking-widest text-primary uppercase">06 / METRICS OVERVIEW</span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Coding Dashboards</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEETCODE PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 glass-card rounded-2xl p-6 bg-zinc-950/60 flex flex-col justify-between space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                <Code2 className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-100 tracking-tight">LeetCode Dashboard</h3>
                <p className="text-[10px] text-zinc-500 font-mono">Synced from {portfolioData.personalInfo.leetcode}</p>
              </div>
            </div>
            
            <a
              href={portfolioData.personalInfo.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-mono bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-amber-500 transition-all cursor-pointer"
            >
              Profile <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Stats content */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            
            {/* SVG Ring solved gauge */}
            <div className="sm:col-span-5 flex justify-center">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r={radius} stroke="rgba(39, 39, 42, 0.4)" strokeWidth="6" fill="none" />
                  <motion.circle
                    cx="56"
                    cy="56"
                    r={radius}
                    stroke="#f59e0b" // amber-500
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset: strokeDashoffset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                  <span className="text-lg font-bold text-zinc-100 tabular-nums">{lc.totalSolved}</span>
                  <span className="text-[9px] text-zinc-500">Solved</span>
                </div>
              </div>
            </div>

            {/* Difficulty Meters */}
            <div className="sm:col-span-7 space-y-3.5">
              
              {/* Easy */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-emerald-500 font-bold">Easy</span>
                  <span className="text-zinc-400 tabular-nums">{lc.easySolved} / {lc.easyTotal}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 border border-zinc-800/40 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 bottom-0 bg-emerald-500" style={{ width: `${(lc.easySolved / lc.easyTotal) * 100}%` }} />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-amber-500 font-bold">Medium</span>
                  <span className="text-zinc-400 tabular-nums">{lc.mediumSolved} / {lc.mediumTotal}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 border border-zinc-800/40 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 bottom-0 bg-amber-500" style={{ width: `${(lc.mediumSolved / lc.mediumTotal) * 100}%` }} />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-mono">
                  <span className="text-rose-500 font-bold">Hard</span>
                  <span className="text-zinc-400 tabular-nums">{lc.hardSolved} / {lc.hardTotal}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 border border-zinc-800/40 rounded-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 bottom-0 bg-rose-500" style={{ width: `${(lc.hardSolved / lc.hardTotal) * 100}%` }} />
                </div>
              </div>

            </div>
          </div>

          {/* Footer ratings */}
          <div className="grid grid-cols-2 gap-4 border-t border-zinc-900 pt-4 text-center font-mono">
            <div className="bg-zinc-900/30 border border-zinc-900/60 p-2.5 rounded-xl">
              <span className="text-[9px] text-zinc-500 block uppercase">Contest Rating</span>
              <span className="text-sm font-bold text-amber-500 flex justify-center items-center gap-1 mt-0.5">
                <Award className="w-4 h-4" /> {lc.contestRating}
              </span>
            </div>
            <div className="bg-zinc-900/30 border border-zinc-900/60 p-2.5 rounded-xl">
              <span className="text-[9px] text-zinc-500 block uppercase">Global Rank</span>
              <span className="text-sm font-bold text-zinc-200 mt-0.5">{lc.globalRank}</span>
            </div>
          </div>

        </motion.div>

        {/* GITHUB PANEL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-6 glass-card rounded-2xl p-6 bg-zinc-950/60 flex flex-col justify-between space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-zinc-900 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <GithubIcon className="w-4.5 h-4.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-100 tracking-tight">GitHub Operations</h3>
                <p className="text-[10px] text-zinc-500 font-mono">API dynamic workspace sync metrics</p>
              </div>
            </div>
            
            <a
              href={portfolioData.personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-mono bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 rounded-lg text-zinc-400 hover:text-primary transition-all cursor-pointer"
            >
              Profile <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Visual Contributions Mock Grid */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>CONTRIBUTIONS CALENDAR</span>
              <span>1,248 commits this year</span>
            </div>
            <div className="bg-[#020202] border border-zinc-900 p-3 rounded-xl flex items-center justify-center">
              {renderContributionGrid()}
            </div>
          </div>

          {/* Commits feed stream */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Recent Activity Stream</div>
            
            <div className="space-y-2.5 max-h-[110px] overflow-y-auto pr-1 no-scrollbar text-[11px] font-mono">
              {gh.recentActivity.map((act, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-zinc-400">
                  <GitCommit className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5 animate-pulse" />
                  <div className="flex-1 space-y-0.5">
                    <div className="flex justify-between items-center">
                      <span className="text-zinc-200 font-bold">{act.repo}</span>
                      <span className="text-[9px] text-zinc-500">{act.date}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 leading-normal line-clamp-1">{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer repository stats */}
          <div className="grid grid-cols-3 gap-2 border-t border-zinc-900 pt-4 text-center font-mono text-xs text-zinc-400">
            <div className="flex flex-col">
              <span className="text-[8px] text-zinc-500 uppercase">Repositories</span>
              <span className="font-bold text-zinc-200 mt-0.5 tabular-nums">{gh.repositories}</span>
            </div>
            <div className="flex flex-col border-x border-zinc-900">
              <span className="text-[8px] text-zinc-500 uppercase">Stars</span>
              <span className="font-bold text-zinc-200 mt-0.5 tabular-nums">{gh.stars}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] text-zinc-500 uppercase">Followers</span>
              <span className="font-bold text-zinc-200 mt-0.5 tabular-nums">{gh.followers}</span>
            </div>
          </div>

        </motion.div>
        
      </div>
    </section>
  );
}

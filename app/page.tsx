"use client";

import Link from "next/link";
import PortfolioShell from "@/components/PortfolioShell";
import PhotoUploadCard from "@/components/PhotoUploadCard";
import { portfolioData } from "@/data/portfolio";

const pages = [
  { href: "/about", label: "About", desc: "Profile, story, timeline, and personal highlights" },
  { href: "/skills", label: "Skills", desc: "Frontend, backend, AI, tooling, and growth stack" },
  { href: "/projects", label: "Projects", desc: "Selected builds with personal photos and demo context" },
  { href: "/certifications", label: "Certifications", desc: "Credentials and verified expertise" },
  { href: "/education", label: "Education", desc: "Academic background and educational journey" },
  { href: "/library", label: "Library", desc: "Three featured books with photo covers" },
  { href: "/dashboards", label: "Dashboards", desc: "LeetCode and GitHub insights" },
  { href: "/contact", label: "Contact", desc: "Reach out and connect" },
];

export default function Home() {
  return (
    <PortfolioShell>
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-28 space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono tracking-[0.35em] text-primary uppercase">AI / ML Portfolio</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              I build intelligent systems around machine learning, deep learning, and generative AI.
            </h1>
            <p className="max-w-2xl text-base md:text-lg text-zinc-400 leading-relaxed">
              I am an AI/ML-focused developer with a strong foundation in deep learning, agentic systems, explainable AI, and full-stack development. This portfolio highlights my projects, skills, certifications, and learning journey in GenAI and applied machine learning.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
                View My Background
              </Link>
              <Link href="/projects" className="rounded-full border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-300 transition hover:border-primary hover:text-white">
                Explore AI Projects
              </Link>
            </div>
          </div>

          <div className="glass-card rounded-3xl border border-zinc-800/80 p-6 space-y-4">
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-4 text-sm text-zinc-400">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">Current focus</p>
              <p className="mt-2 text-base text-zinc-200">Machine learning, deep learning, GenAI, agentic AI, and practical software engineering.</p>
            </div>
            {/* Customized Profile Cover Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950/60 shadow-2xl flex flex-col pb-6">
              {/* Green Banner Background */}
              <div className="relative h-32 w-full bg-gradient-to-r from-emerald-950 via-emerald-900 to-zinc-950 flex items-center justify-end px-6 overflow-hidden">
                {/* Gold geometric decorations on left */}
                <div className="absolute left-0 top-0 h-full w-1/3 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.3),transparent_60%)]" />
                <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-amber-400 via-yellow-500 to-transparent" />
                
                {/* Golden slash lines */}
                <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-amber-500/20 rotate-[30deg] origin-top" />
                <div className="absolute left-20 top-0 bottom-0 w-[1px] bg-amber-500/10 rotate-[30deg] origin-top" />

                {/* Banner Text Content on the Right */}
                <div className="text-right space-y-1 z-10">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-amber-100 tracking-wide border-b border-amber-500/30 pb-0.5 inline-block">
                    Amit Jatthap
                  </h3>
                  <p className="text-[10px] md:text-xs font-sans font-semibold text-amber-400 tracking-widest uppercase">
                    MCA (AI/ML) STUDENT
                  </p>
                  <p className="text-[9px] md:text-xs font-mono text-zinc-350 flex items-center justify-end gap-1">
                    <span className="inline-block w-3.5 h-3.5 rounded-full border border-amber-500/30 flex items-center justify-center text-[8px] text-amber-400">✉</span>
                    amitsumitjatthap@gmail.com
                  </p>
                </div>

                {/* Edit Pencil top-right */}
                <button className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 border border-zinc-700/50 hover:bg-black/60 text-zinc-300 hover:text-white transition">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>

              {/* Profile Photo area (overlapping) */}
              <div className="flex justify-between items-end px-6 -mt-10 z-20">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full border-4 border-zinc-950 overflow-hidden bg-zinc-900 shadow-xl">
                    <img 
                      src={portfolioData.personalInfo.profileImageUrl} 
                      alt="Amit Jatthap profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Edit Pencil next to profile */}
                  <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-300 hover:text-white transition shadow-lg">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pages.map((page) => (
            <Link key={page.href} href={page.href} className="group rounded-2xl border border-zinc-800/70 bg-zinc-900/40 p-5 transition hover:-translate-y-1 hover:border-primary/50">
              <p className="text-sm font-semibold text-zinc-100">{page.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">{page.desc}</p>
              <span className="mt-4 inline-flex text-xs font-mono uppercase tracking-[0.25em] text-primary">Open page →</span>
            </Link>
          ))}
        </div>
      </section>
    </PortfolioShell>
  );
}

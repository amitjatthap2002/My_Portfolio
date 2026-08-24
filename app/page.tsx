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
            <PhotoUploadCard
              label="Home photo"
              description="Upload a photo that appears on the landing page."
              initialSrc={portfolioData.personalInfo.sectionImageUrls?.home || portfolioData.personalInfo.profileImageUrl}
              alt="Portfolio home photo"
              previewClassName="h-56 w-full object-contain"
            />
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

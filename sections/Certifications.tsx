"use client";

import { motion } from "framer-motion";
import { ExternalLink, BadgeCheck, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Certifications() {
  const certifications = portfolioData.certifications;

  return (
    <section id="certifications" className="py-24 px-6 md:px-12 max-w-6xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono tracking-widest text-primary uppercase">04 / VERIFIED EXPERTISE</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Certifications</h2>
        </div>
        <p className="max-w-xl text-sm text-zinc-400 leading-relaxed">
          A curated set of credentials that reflect my focus on modern full-stack development, AI systems, and production-grade delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
          className="group relative overflow-hidden glass-card rounded-2xl border border-dashed border-zinc-700/80 bg-zinc-950/40"
        >
          <div className="relative h-40 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.28),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.2),transparent_45%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-black/25 backdrop-blur-md shadow-[0_0_35px_rgba(139,92,246,0.12)] text-primary">
                <BadgeCheck className="h-10 w-10" />
              </div>
            </div>
          </div>
          <div className="space-y-4 p-5">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-zinc-100">Add Your Certificate</h3>
              <p className="text-sm text-zinc-400">Use this card as a placeholder for a new credential, badge, or verified achievement.</p>
            </div>
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="font-mono uppercase tracking-wider">Ready to customize</span>
              <span className="rounded-full border border-zinc-700 px-2.5 py-1 text-[10px] uppercase tracking-wider text-zinc-300">
                Add now
              </span>
            </div>
          </div>
        </motion.article>
        {certifications.map((cert, index) => (
          <motion.article
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group relative overflow-hidden glass-card rounded-2xl border-zinc-800/80"
          >
            <div className="relative h-40 overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.28),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.2),transparent_45%)]" />
              {cert.imageUrl ? (
                <img src={cert.imageUrl} alt={cert.title} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-black/25 backdrop-blur-md shadow-[0_0_35px_rgba(139,92,246,0.12)]">
                    <BadgeCheck className="h-10 w-10 text-primary" />
                  </div>
                </div>
              )}
              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-zinc-300 backdrop-blur-sm">
                Verified Credential
              </div>
              <Sparkles className="absolute bottom-3 right-3 h-4 w-4 text-secondary/60" />
            </div>

            <div className="space-y-4 p-5">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-zinc-100">{cert.title}</h3>
                <p className="text-sm text-zinc-400">{cert.organization}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span className="font-mono uppercase tracking-wider">Issued {cert.date}</span>
                <div className="flex items-center gap-2">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-zinc-300 transition-colors hover:text-primary"
                  >
                    Verify <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, Phone, Globe2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formErrors, setFormErrors] = useState({ name: false, email: false, message: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email),
      message: !formData.message.trim(),
    };

    if (errors.name || errors.email || errors.message) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY_HERE",
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        
        // Auto-hide success message after 5 seconds
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 md:px-12 max-w-6xl mx-auto space-y-16">
      
      {/* Title */}
      <div className="space-y-2">
        <span className="text-xs font-mono tracking-widest text-secondary uppercase">07 / TRANSMISSION</span>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Get in Touch</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Left Side: Contact Cards & World Map Dot Grid visual */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            <p className="text-sm text-zinc-400 leading-relaxed font-sans">
              Have a project in mind or want to talk systems architecture? Drop me a message, and I'll get back to you within 24 hours.
            </p>

            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950/40">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase">Direct Correspondence</span>
                  <a href={`mailto:${portfolioData.personalInfo.email}`} className="text-zinc-200 hover:text-primary transition-colors">
                    {portfolioData.personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950/40">
                <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase">Phone</span>
                  <span className="text-zinc-200">{portfolioData.personalInfo.phone}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950/40">
                <div className="w-9 h-9 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                  <MapPin className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <span className="text-[9px] text-zinc-500 block uppercase">Base Coordinates</span>
                  <span className="text-zinc-200">{portfolioData.personalInfo.location}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a href={portfolioData.personalInfo.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-400 transition-colors hover:border-primary/40 hover:text-primary">
                  <GithubIcon className="w-4 h-4" />
                  <span className="text-[11px] font-medium">GitHub</span>
                </a>
                <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-400 transition-colors hover:border-primary/40 hover:text-primary">
                  <LinkedinIcon className="w-4 h-4" />
                  <span className="text-[11px] font-medium">LinkedIn</span>
                </a>
                <a href={portfolioData.personalInfo.leetcode} target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950/40 px-3 py-2 text-zinc-400 transition-colors hover:border-primary/40 hover:text-primary">
                  <Globe2 className="w-4 h-4" />
                  <span className="text-[11px] font-medium">LeetCode</span>
                </a>
              </div>
            </div>
          </div>

          {/* World Map Dot Grid Visualizer */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-zinc-900 bg-zinc-950/60 p-4 flex items-center justify-center">
            
            {/* World grid pattern overlay */}
            <svg viewBox="0 0 240 100" fill="none" className="w-full h-full text-zinc-800/40">
              {/* Dot grid */}
              {Array.from({ length: 12 }).map((_, r) =>
                Array.from({ length: 28 }).map((_, c) => (
                  <circle
                    key={`${r}-${c}`}
                    cx={8 + c * 8.2}
                    cy={6 + r * 7.8}
                    r="1"
                    fill="currentColor"
                  />
                ))
              )}

              {/* Connecting orbit curves */}
              <path d="M 40 40 Q 110 10 160 55" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
              <path d="M 160 55 Q 190 20 220 30" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
              
              {/* Pune India coordinates (Approx 160, 55 on visual coordinate scale) */}
              <circle cx="160" cy="55" r="4.5" className="fill-secondary/30 animate-ping" />
              <circle cx="160" cy="55" r="2.5" className="fill-secondary shadow-[0_0_8px_var(--secondary)]" />
            </svg>

            <div className="absolute bottom-3 left-3 font-mono text-[8px] text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" /> PUNE GN-GRID MARKER ACTIVE
            </div>
          </div>
        </div>

        {/* Right Side: Professional Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 glass-card rounded-2xl p-6 bg-zinc-950/60 flex flex-col justify-between border-zinc-850 relative"
        >
          {/* Success screen overlay */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-zinc-950/95 z-20 flex flex-col items-center justify-center p-6 text-center space-y-4 rounded-2xl"
              >
                <CheckCircle className="w-12 h-12 text-emerald-500 animate-bounce" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-zinc-100 uppercase">Transmission Successful</h4>
                  <p className="text-xs text-zinc-400">Thank you! Your message has been routed to Amit's inbox.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              
              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono text-zinc-500 uppercase">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-zinc-900/40 border ${
                      formErrors.name ? "border-red-500" : "border-zinc-800"
                    } hover:border-zinc-700/80 text-xs text-zinc-200 placeholder-zinc-650 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition-colors focus:ring-0`}
                    placeholder="e.g. Jane Doe"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono text-zinc-500 uppercase">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-zinc-900/40 border ${
                      formErrors.email ? "border-red-500" : "border-zinc-800"
                    } hover:border-zinc-700/80 text-xs text-zinc-200 placeholder-zinc-650 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition-colors focus:ring-0`}
                    placeholder="e.g. jane@domain.com"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-[10px] font-mono text-zinc-500 uppercase">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700/80 text-xs text-zinc-200 placeholder-zinc-650 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition-colors focus:ring-0"
                  placeholder="e.g. Collaboration Proposal"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-[10px] font-mono text-zinc-500 uppercase">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full bg-zinc-900/40 border ${
                    formErrors.message ? "border-red-500" : "border-zinc-800"
                  } hover:border-zinc-700/80 text-xs text-zinc-200 placeholder-zinc-650 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-primary transition-colors focus:ring-0 resize-none`}
                  placeholder="Describe your project requirements..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium text-xs tracking-wider uppercase cursor-pointer hover:shadow-lg hover:shadow-primary/20 disabled:opacity-50 transition-all select-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Routing Message...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    Transmit Message
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

      </div>
    </section>
  );
}

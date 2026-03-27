import { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';

const testimonials = [
  {
    quote: "Talent shines, but your dedication sets you apart. Working with Mayank means witnessing someone who truly puts their soul into every line of code.",
    name: "Ankureet Cheema",
    role: "Cyber Security Analyst",
    initials: "AC",
    color: "#ec4899"
  },
  {
    quote: "Mayank, your dedication turns talent into brilliance. He doesn't just build websites; he builds digital artifacts that feel alive.",
    name: "Raunak Azad",
    role: "Software Developer",
    initials: "RA",
    color: "#a855f7"
  },
  {
    quote: "It’s rare to find a developer who understands both the logic of a system and the soul of a design. Working together was effortless and inspiring.",
    name: "Aarav",
    role: "Software Developer",
    initials: "AA",
    color: "#f43f5e"
  },
  {
    quote: "He has an obsession with detail that is frankly inspiring. He doesn't just ship features; he crafts experiences that stay with you.",
    name: "Divya Kumari",
    role: "Software Developer",
    initials: "DK",
    color: "#ec4899"
  },
  {
    quote: "The depth of his technical skill is matched only by his character. A brilliant mind and an even better person to collaborate with on complex problems.",
    name: "Abhay Chaudhry",
    role: "Software Developer",
    initials: "AC",
    color: "#a855f7"
  },
  {
    quote: "It’s been an incredible experience seeing Mayank solve complex logic with ease. His passion for clean, scalable code is rare.",
    name: "Aryan Raut",
    role: "Software Developer",
    initials: "AR",
    color: "#f43f5e"
  },
  {
    quote: "Collaboration is second nature to Mayank. He doesn’t just build products; he ensures the whole team moves forward together.",
    name: "Harshita Kumari",
    role: "Software Developer",
    initials: "HK",
    color: "#ec4899"
  },
];

const doubled = [...testimonials, ...testimonials, ...testimonials];

function TestimonialCard({ t }) {
  return (
    <div className="flex-shrink-0 w-[400px] md:w-[500px] p-4">
      <div className="relative h-full p-8 md:p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl overflow-hidden group transition-all duration-700 hover:border-white/10">

        {/* Glassmorphic Hover Gradient */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% -20%, ${t.color}15 0%, transparent 70%)`
          }}
        />

        {/* Watermark Initials */}
        <div className="absolute -bottom-6 -right-4 text-[140px] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter transition-transform duration-1000 group-hover:-translate-y-6">
          {t.initials}
        </div>

        {/* Quote Icon */}
        <div className="relative z-10 mb-10">
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-500/20 group-hover:text-pink-500/40 transition-colors duration-500">
            <path d="M14.017 21L14.017 18C14.017 14.686 16.703 12 20.017 12V6C16.703 6 14.017 8.686 14.017 12H11.017V6C7.703 6 5.017 8.686 5.017 12V18C5.017 21.314 7.703 24 11.017 24H14.017V21ZM5.017 12H2.017V6C2.017 2.686 4.703 0 8.017 0V6C4.703 6 2.017 8.686 2.017 12V18C2.017 21.314 4.703 24 8.017 24H11.017V21M11.017 21L11.017 18C11.017 14.686 13.703 12 17.017 12V6C13.703 6 11.017 8.686 11.017 12H8.017V6C4.703 6 2.017 8.686 2.017 12V18C2.017 21.314 4.703 24 8.017 24H11.017V21" fill="currentColor" />
          </svg>
        </div>

        <p className="relative z-10 text-zinc-300 text-lg md:text-xl leading-relaxed mb-12 font-medium">
          "{t.quote}"
        </p>

        <div className="relative z-10 flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 border border-white/5 flex items-center justify-center group-hover:border-pink-500/30 transition-all duration-700 text-white font-bold text-sm tracking-wider shadow-2xl">
            {t.initials}
          </div>
          <div>
            <p className="text-white text-lg font-bold tracking-tight mb-1">{t.name}</p>
            <p className="text-pink-500 font-mono text-[10px] uppercase tracking-[0.3em] font-black opacity-80">
              {t.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-48 bg-zinc-950 relative overflow-hidden">

      {/* Background ambient glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(236,72,153,0.03),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-32 relative z-10">
        <ScrollReveal direction="up" className="flex flex-col items-center text-center">
          <span className="text-pink-500 text-[10px] uppercase tracking-[0.5em] font-black block mb-8">Voices of Collaboration</span>
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-[0.85]">
            {/* Human <span className="text-transparent" style={{ WebkitTextStroke: '2px #ec4899' }}>Impact</span> */}
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #ec4899' }}>Testimonials</span>
          </h2>
          <p className="mt-12 text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
            Perspective from the brilliant minds I've had the privilege to build and innovate with.
          </p>
        </ScrollReveal>
      </div>

      <div className="relative z-10">
        {/* Soft edge fade for more depth */}
        <div className="absolute inset-y-0 left-0 w-72 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-72 bg-gradient-to-l from-zinc-950 via-zinc-950/90 to-transparent z-20 pointer-events-none" />

        <div className="flex w-max" style={{ animation: 'marqueeLeft 50s linear infinite' }}>
          {doubled.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
      `}} />
    </section>
  );
}

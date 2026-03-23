import { motion } from 'framer-motion';

const stats = [
  '15+ Projects Built',
  'CGPA 8.02 / 10',
  '2+ Years of Learning',
  '20+ Technologies',
  'MERN Stack',
  '3D & WebGL',
  'Open to Work',
  'Full Stack Dev',
];

// Duplicate for seamless loop
const doubled = [...stats, ...stats];

const techIcons = [
  'React', 'Next.js', 'Three.js', 'Node.js', 'TypeScript',
  'MongoDB', 'Tailwind', 'Framer Motion', 'Express', 'Git',
  'Figma', 'Vercel',
];
const doubledIcons = [...techIcons, ...techIcons];

export default function StatsBar() {
  return (
    <div className="relative py-5 bg-zinc-950 border-y border-zinc-800/60 overflow-hidden select-none">
      {/* Left + right fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

      {/* Pink glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-pink-500/3 to-transparent pointer-events-none" />

      {/* Row 1 — Stats (left scroll) */}
      <div className="flex mb-3" style={{ animation: 'marqueeLeft 28s linear infinite' }}>
        {doubled.map((stat, i) => (
          <span key={i} className="flex-shrink-0 flex items-center gap-2 px-8 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            <span className="text-pink-500 text-base leading-none">◆</span>
            {stat}
          </span>
        ))}
      </div>

      {/* Row 2 — Tech (right scroll) */}
      <div className="flex" style={{ animation: 'marqueeRight 22s linear infinite' }}>
        {doubledIcons.map((tech, i) => (
          <span key={i} className="flex-shrink-0 flex items-center gap-2 px-8 text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600">
            <span className="text-pink-500/40">▸</span>
            {tech}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marqueeLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

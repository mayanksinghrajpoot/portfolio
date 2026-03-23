import { motion } from 'framer-motion';
import GlitchText from '../components/ui/GlitchText';
import ScrollReveal from '../components/ui/ScrollReveal';

const testimonials = [
  { quote: "Mayank is an incredibly fast learner. He built our entire frontend architecture from scratch in weeks.", name: "Sarah J.", role: "Senior Engineer", initials: "SJ" },
  { quote: "The attention to detail in his 3D WebGL work is genuinely Awwwards-tier. A rare talent.", name: "Marcus T.", role: "Creative Director", initials: "MT" },
  { quote: "Seamless communication and wrote brilliantly clean, maintainable MERN stack code for our MVP.", name: "Elena R.", role: "Startup Founder", initials: "ER" },
  { quote: "His grasp of complex React rendering cycles helped us drop our load time by incredibly.", name: "David K.", role: "Tech Lead", initials: "DK" },
  { quote: "A passionate developer who understands both hardcore logic and beautiful typography.", name: "Aisha M.", role: "Designer", initials: "AM" }
];

const doubled = [...testimonials, ...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
        <ScrollReveal direction="up" className="mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter text-white">
            Client <span className="text-pink-500 italic font-medium">Feedback</span>
          </h2>
          <p className="mt-6 text-zinc-400 max-w-lg">
            What collaborators and clients have said about my engineering output and design eye.
          </p>
        </ScrollReveal>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

        <div className="flex w-max" style={{ animation: 'marqueeLeft 40s linear infinite' }}>
          {doubled.map((t, i) => (
            <div key={i} className="flex-shrink-0 w-[350px] md:w-[450px] p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 mx-4 cursor-grab active:cursor-grabbing hover:bg-zinc-900 transition-colors group">
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed mb-8 font-medium">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all text-pink-500 font-bold uppercase tracking-widest text-xs">
                  {t.initials}
                </div>
                <div>
                  <p className="text-white text-sm font-bold tracking-wider uppercase">{t.name}</p>
                  <p className="text-zinc-500 text-[10px] mt-0.5 uppercase tracking-widest font-bold">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

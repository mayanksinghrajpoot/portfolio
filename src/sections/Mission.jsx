import { motion } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';
import myImg from '../images/myimg.jpg';

export default function Mission() {
  return (
    <section id="mission" className="relative py-32 px-6 md:px-12 bg-[#050505] overflow-hidden flex items-center justify-center min-h-screen">
      {/* Ambient pink noise/glow */}
      <div className="absolute inset-0 bg-pink-500/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">

        {/* Left: Stylized Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-[4/5] md:aspect-square max-w-md mx-auto lg:mx-0 group"
        >
          {/* Cyberpunk Duo-tone effect container */}
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden bg-black border border-white/10 shadow-2xl">
            {/* The Image */}
            <img
              src={myImg}
              alt="Mayank Singh Rajpoot"
              className="w-full h-full object-contain grayscale contrast-[1.1] brightness-90 transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Pink overlay to create the duo-tone pink/black aesthetic */}
            <div className="absolute inset-0 bg-pink-500 mix-blend-multiply opacity-50 pointer-events-none transition-opacity duration-700 group-hover:opacity-30" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />

            {/* Corner accents */}
            <div className="absolute top-6 left-6 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
            <div className="absolute bottom-6 right-6 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.8)]" />
          </div>

          {/* Floating status badge */}
          <div className="absolute -bottom-6 -right-6 md:-right-12 bg-zinc-900 border border-white/10 backdrop-blur-xl p-6 rounded-2xl shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <p className="text-[9px] text-zinc-400 uppercase tracking-[0.3em] font-bold">Status</p>
            </div>
            <p className="text-white font-mono text-sm tracking-tight">Building bridges to tomorrow</p>
          </div>
        </motion.div>

        {/* Right: Active Copywriting */}
        <div className="flex flex-col">
          <ScrollReveal direction="up" delay={0.2}>
            <h3 className="text-pink-500 text-[10px] uppercase tracking-[0.4em] font-black mb-6">
              The Mission
            </h3>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[1.1] mb-8">
              I bridge the gap between <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #ec4899' }}>engineering</span> <br className="hidden md:block" />& design
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-6 font-medium">
              I don't just write code. I architect systems that breathe and craft interfaces that feel alive.
            </p>
            <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-10 max-w-xl">
              Every pixel and database query is a choice made with purpose—to elevate a website into a digital reality that actually connects.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#work" className="bg-white text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-shadow">
                View My Work
              </a>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
}

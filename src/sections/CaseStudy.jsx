import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import GlitchText from '../components/ui/GlitchText';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function CaseStudy() {
  const container = useRef(null);
  
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });
  
  const rotateY = useTransform(smoothX, [0, 1], [12, -12]);
  const rotateX = useTransform(smoothY, [0, 1], [-12, 12]);
  const glareOpacity = useTransform(smoothY, [0, 1], [0, 0.4]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden border-t border-zinc-900" ref={container}>
      <div className="absolute inset-0 bg-pink-500/5 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollReveal direction="up" className="mb-16">
          <span className="text-pink-500 text-[10px] uppercase tracking-[0.4em] font-bold mb-4 block">Featured Case Study</span>
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
            Building <br/>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #ec4899'}}>Bright Path AI</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-wide">The Problem</h3>
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">Modern learning platforms lack personalized roadmaps. Students are often overwhelmed by endless resources and do not know where to start or how to systematically progress towards their goal.</p>
              </div>
              
              <div className="h-[1px] w-full bg-zinc-800/80" />

              <div>
                <h3 className="text-xl font-bold text-white mb-4 tracking-wide">The Architecture</h3>
                <ul className="space-y-3">
                  {['React & Tailwind (Frontend UI)', 'Node.js & Express (API Layer)', 'MongoDB (Data Persistence)', 'OpenAI API (Dynamic Roadmap Generation)'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <a href="https://github.com/mayanksinghrajpoot" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white text-black text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform duration-300">
                View Source Code
              </a>
            </div>
          </ScrollReveal>

          {/* Right 3D Mockup */}
          <ScrollReveal direction="left" delay={0.4}>
            <div 
              className="relative w-full aspect-[4/3] rounded-3xl cursor-crosshair group"
              style={{ perspective: '1200px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div 
                style={{ rotateX, rotateY }}
                className="w-full h-full rounded-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] flex items-center justify-center p-2 transform-style-3d relative"
              >
                {/* Simulated Glare */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-20"
                    style={{ opacity: glareOpacity }}
                />

                {/* Fallback mockup representation */}
                <div className="w-full h-full bg-[#0a0a0a] rounded-xl relative overflow-hidden border border-zinc-800 z-10 translate-z-[50px]">
                   <div className="absolute top-0 left-0 right-0 h-8 bg-zinc-950 border-b border-zinc-800 flex items-center px-4 gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                     <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                     <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                   </div>
                   <div className="mt-12 p-8 h-full flex flex-col justify-center items-center text-center">
                     <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 mb-6 flex-shrink-0 shadow-[0_0_40px_rgba(236,72,153,0.4)]" />
                     <h4 className="text-2xl font-bold text-white mb-2">Bright Path AI</h4>
                     <p className="text-zinc-500 text-sm max-w-xs">Your personalized AI learning companion. Generating custom roadmaps in seconds.</p>
                   </div>
                </div>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

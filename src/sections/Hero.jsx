import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroScene from '../components/canvas/HeroScene';
import GlitchText from '../components/ui/GlitchText';

export default function Hero() {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={container} 
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-grid-pattern"
    >
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <HeroScene />

      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center text-center mt-12 pointer-events-none mix-blend-difference"
      >
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
        >
          <span className="text-pink-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-6 block border border-pink-500/30 w-fit mx-auto px-4 py-1.5 rounded-full bg-pink-500/10 backdrop-blur-md">B.Tech Student & Tech Explorer</span>
          <span className="text-white/70 font-medium tracking-widest uppercase text-xs md:text-sm mb-6 block">Creative Full-Stack Developer</span>
        </motion.div>
        
        <motion.h1 
          className="text-6xl md:text-[10vw] font-bold uppercase tracking-tighter leading-[0.85] text-white m-0 p-0 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <GlitchText text="Mayank" />
          <br />
          <GlitchText as="span" className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255,255,255,1)'}} text="Singh" />
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="mt-8 text-zinc-300 max-w-sm md:max-w-xl text-sm md:text-lg mix-blend-normal"
        >
            Crafting beautiful & functional web experiences. Passionate about building performant, user-friendly, and scalable applications.
        </motion.p>
      </motion.div>
    </section>
  );
}

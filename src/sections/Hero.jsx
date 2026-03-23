import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import HeroScene from '../components/canvas/HeroScene';
import GlitchText from '../components/ui/GlitchText';
import TextPressure from '../components/ui/TextPressure';


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
          {/* <span className="text-pink-500 font-medium tracking-widest uppercase text-xs md:text-sm mb-6 block border border-pink-500/30 w-fit mx-auto px-4 py-1.5 rounded-full bg-pink-500/10 backdrop-blur-md">Available for New Opportunities</span> */}
          {/* <span className="text-white/70 font-medium tracking-widest uppercase text-xs md:text-sm mb-6 block">Full Stack Developer</span> */}
        </motion.div>

        <motion.div
          className="w-full min-w-5xl mx-auto flex flex-col items-center pointer-events-auto"
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* <div className="h-[15vw] md:h-[12vw] w-full"> */}
          <TextPressure
            text="Mayank"
            fontFamily="Compressa VF"
            textColor="#FFFFFF"
            minFontSize={60}
          />
          {/* </div> */}
          {/* <div className="h-[12vw] md:h-[10vw] w-full -mt-[2vw]">
            <TextPressure 
                text="SINGH" 
                fontFamily="Compressa VF"
                textColor="#FFFFFF"
                minFontSize={50}
            />
          </div> */}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="mt-8 text-zinc-300 max-w-sm md:max-w-xl text-sm md:text-lg mix-blend-normal"
        >
          Crafting beautiful & functional web experiences. Passionate about building performant, user-friendly, and scalable applications.
        </motion.p>

        {/* See Work CTA */}
        <motion.a
          href="#work"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 pointer-events-auto inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-xs uppercase tracking-widest font-bold hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300 group"
        >
          See My Work
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </motion.a>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 pointer-events-none"
      >
        <span className="text-zinc-500 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-[1px] h-10 bg-gradient-to-b from-pink-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}

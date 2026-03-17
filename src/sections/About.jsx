import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TechGrid from '../components/ui/TechGrid';
import GlitchText from '../components/ui/GlitchText';
import About3DModel from '../components/canvas/About3DModel';
import profileImg from '../images/my-img.jpeg';

const techGroups = [
  {
    category: 'Frontend & UI',
    skills: ['HTML', 'CSS', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'ReactJS', 'NextJS', 'Framer Motion', 'Redux Toolkit']
  },
  {
    category: 'Backend & DB',
    skills: ['NodeJS', 'ExpressJS', 'MongoDB', 'C++']
  },
  {
    category: 'Tools & Others',
    skills: ['Git', 'GitHub', 'Vercel', 'Postman', 'Figma']
  }
];

export default function About() {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 80%", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], ["50px", "0px"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section 
      id="about" 
      ref={container} 
      className="relative min-h-screen py-32 px-6 md:px-12 flex flex-col items-center justify-center bg-zinc-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-pink-500/10 blur-[150px] rounded-full pointer-events-none max-w-2xl mx-auto" />
      
      <div className="max-w-5xl relative z-10 w-full mix-blend-difference mt-24">
        <motion.p 
          style={{ y: textY, opacity: textOpacity }}
          className="text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-tight text-white mb-24 text-center pointer-events-auto"
        >
          I am a <GlitchText as="span" className="text-pink-500 italic font-medium" text="creative explorer" /> and B.Tech student who loves tinkering with 3D web and high-end animations.
        </motion.p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 text-left text-zinc-400 items-start">

          <div className=" py-8 lg:py-0">
            <About3DModel/>
           </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-white text-xl uppercase font-bold tracking-widest mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-pink-500"></span>
                Exploration
              </h3>
              <div className="border-l border-zinc-800 pl-6 ml-4 space-y-6">
                <div>
                  <h4 className="text-white font-medium text-lg">Creative Tech Explorer</h4>
                  <p className="text-xs tracking-widest uppercase mt-1 mb-2 text-pink-400">2023 – Present</p>
                  <p className="text-sm">Actively tinkering with the MERN stack and 3D web graphics. Focused on pushing the boundaries of web interactivity and aesthetic depth.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white text-xl uppercase font-bold tracking-widest mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-pink-500"></span>
                Education
              </h3>
              <div className="border-l border-zinc-800 pl-6 ml-4 space-y-6">
                <div>
                  <h4 className="text-white font-medium text-lg">Lovely Professional University</h4>
                  <p className="text-xs tracking-widest uppercase mt-1 mb-2 text-pink-400">2023 - 2025 — CGPA: 8.1</p>
                  <p className="text-sm">Computer Science And Engineering</p>
                </div>
              </div>
            </div>
          </div>

          

          <div>
            <h3 className="text-white text-xl uppercase font-bold tracking-widest mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-pulse"></span>
              Tech Stack
            </h3>
            <TechGrid techGroups={techGroups} />
          </div>
        </div>
      </div>
    </section>
  );
}

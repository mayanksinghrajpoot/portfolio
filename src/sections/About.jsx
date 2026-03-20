import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BentoCard from '../components/ui/BentoCard';
import GlitchText from '../components/ui/GlitchText';
import About3DModel from '../components/canvas/About3DModel';

const techGroups = [
  {
    category: 'Frontend & UI',
    skills: ['HTML', 'CSS', 'Tailwind', 'JS', 'TS', 'React', 'NextJS', 'Framer', 'Redux']
  },
  {
    category: 'Backend & DB',
    skills: ['NodeJS', 'Express', 'MongoDB', 'C++']
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
      className="relative min-h-screen py-32 px-6 md:px-12 bg-zinc-950 overflow-hidden"
    >
      <div className="absolute inset-0 bg-pink-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
           style={{ y: textY, opacity: textOpacity }}
           className="mb-24 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-white mb-8">
            Blending <span className="text-pink-500 italic">Creativity</span> with <GlitchText as="span" text="Logic" />
          </h2>
          <p className="text-zinc-500 text-lg md:text-xl font-medium tracking-tight">
             I am a passionate developer who loves solving problems and creating seamless dynamic applications.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          
          {/* 3D Avatar - Hero of the Bento */}
          <BentoCard span="lg:col-span-2 lg:row-span-2" className="p-0 flex items-center justify-center bg-zinc-900/20">
             <div className="absolute inset-x-0 top-8 text-center z-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-pink-500/50">3D Interaction</span>
             </div>
             <About3DModel />
          </BentoCard>

          {/* Experience */}
          <BentoCard span="lg:col-span-2 lg:row-span-1" delay={0.1}>
            <h3 className="text-white text-xs uppercase tracking-[0.3em] font-bold mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-pink-500"></span>
              Experience
            </h3>
            <div className="space-y-4">
              <h4 className="text-white text-2xl font-bold">Creative Tech Explorer</h4>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                Actively tinkering with the MERN stack and 3D web graphics. Focused on pushing the boundaries of web interactivity and aesthetic depth.
              </p>
              <div className="pt-4">
                 <span className="px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/5 text-pink-400 text-xs font-bold uppercase tracking-widest">2023 – Present</span>
              </div>
            </div>
          </BentoCard>

          {/* Tech Stack - Frontend */}
          <BentoCard delay={0.2}>
            <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-zinc-500">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {techGroups[0].skills.map(skill => (
                <span key={skill} className="px-3 py-1 rounded-lg bg-zinc-800/50 border border-zinc-700 text-[10px] text-zinc-300 uppercase font-bold tracking-widest hover:border-pink-500/50 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Tech Stack - Backend */}
          <BentoCard delay={0.3}>
            <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-zinc-500">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {techGroups[1].skills.map(skill => (
                <span key={skill} className="px-3 py-1 rounded-lg bg-zinc-800/50 border border-zinc-700 text-[10px] text-zinc-300 uppercase font-bold tracking-widest hover:border-pink-500/50 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Education */}
          <BentoCard delay={0.4}>
            <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-zinc-500">Education</h3>
            <div className="space-y-2">
              <p className="text-white font-bold leading-tight">Lovely Professional University</p>
              <p className="text-zinc-400 text-xs">Computer Science (CSE)</p>
              <div className="mt-4 text-pink-500 text-[10px] font-black tracking-widest uppercase">CGPA: 8.1 / 10</div>
            </div>
          </BentoCard>

          {/* Tech Stack - Tools */}
          <BentoCard delay={0.5}>
            <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-zinc-500">Tools</h3>
            <div className="flex flex-wrap gap-2">
              {techGroups[2].skills.map(skill => (
                <span key={skill} className="px-3 py-1 rounded-lg bg-zinc-800/50 border border-zinc-700 text-[10px] text-zinc-300 uppercase font-bold tracking-widest hover:border-pink-500/50 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}

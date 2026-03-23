import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import BentoCard from '../components/ui/BentoCard';
import GlitchText from '../components/ui/GlitchText';
import About3DModel from '../components/canvas/About3DModel';
import SplitText from '../components/ui/SplitText';
import ScrollReveal from '../components/ui/ScrollReveal';

const techGroups = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 'core' },
      { name: 'Next.js', level: 'core' },
      { name: 'Tailwind', level: 'core' },
      { name: 'TypeScript', level: 'proficient' },
      { name: 'Framer', level: 'proficient' },
      { name: 'Redux', level: 'familiar' },
      { name: 'HTML', level: 'core' },
      { name: 'CSS', level: 'core' },
    ]
  },
  {
    category: 'Backend & DB',
    skills: [
      { name: 'Node.js', level: 'core' },
      { name: 'Express', level: 'core' },
      { name: 'MongoDB', level: 'proficient' },
      { name: 'MySQL', level: 'familiar' },
      { name: 'PHP', level: 'familiar' },
      { name: 'C++', level: 'familiar' },
    ]
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', level: 'core' },
      { name: 'GitHub', level: 'core' },
      { name: 'Three.js', level: 'proficient' },
      { name: 'Figma', level: 'proficient' },
      { name: 'Vercel', level: 'proficient' },
      { name: 'Postman', level: 'familiar' },
    ]
  }
];

const tierColors = {
  core: 'border-pink-500/60 text-pink-300 bg-pink-500/10',
  proficient: 'border-zinc-500/50 text-zinc-200 bg-zinc-800/50',
  familiar: 'border-zinc-700/30 text-zinc-500 bg-zinc-900/30',
};

const tierLabels = { core: '●', proficient: '◐', familiar: '○' };

const defaultStats = [
  { value: 15, suffix: '+', label: 'GitHub Repos', decimals: 0 },
  { value: 2, suffix: '+', label: 'Years Exp', decimals: 0 },
  { value: 8.02, suffix: '', label: 'CGPA', decimals: 1 },
];

export default function About() {
  const container = useRef(null);
  const [repoCount, setRepoCount] = useState(15);
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    fetch('https://api.github.com/users/mayanksinghrajpoot')
      .then(res => {
        if (res.ok) return res.json();
        return null; // silently handle rate limit
      })
      .then(data => {
        if (data && data.public_repos) setRepoCount(data.public_repos);
      })
      .catch(() => { }); // silent fail on network errors
  }, []);

  const stats = [
    { value: repoCount, suffix: '+', label: 'GitHub Repos', decimals: 0 },
    { value: 2, suffix: '+', label: 'Years Exp', decimals: 0 },
    { value: 8.02, suffix: '', label: 'CGPA', decimals: 1 },
  ];

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
          <ScrollReveal direction="up">
            <h2 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter leading-none text-white mb-8">
              The <span className="text-pink-500 italic">Engineering</span> <GlitchText as="span" text="Arsenal" />
            </h2>
          </ScrollReveal>
          <div className="text-zinc-500 text-lg md:text-xl font-medium tracking-tight">
            <SplitText delay={0.2} text="A deep dive into the technologies, frameworks, and tools that power my digital builds." />
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[320px]">

          {/* 3D Avatar - Hero of the Bento */}
          <BentoCard span="lg:col-span-2 lg:row-span-2" className="p-0 flex items-center justify-center bg-zinc-900/20 overflow-hidden">
            <div className="absolute inset-x-0 top-8 text-center z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-pink-500/50">3D Interaction</span>
            </div>
            <About3DModel />
          </BentoCard>

          {/* Experience + Live Stats */}
          <BentoCard span="lg:col-span-2 lg:row-span-1" delay={0.1}>
            <h3 className="text-white text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-pink-500"></span>
              Journey
            </h3>
            <div className="space-y-3 mb-6">
              <h4 className="text-white text-xl font-bold">Full Stack & 3D Web Explorer</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Self-taught since 2021. Building with the MERN stack and pushing web boundaries with 3D/WebGL.
              </p>
            </div>
            {/* Animated stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                  <p className="text-white text-2xl font-black leading-none">
                    {statsInView
                      ? <CountUp end={stat.value} decimals={stat.decimals} duration={2.5} suffix={stat.suffix} />
                      : `0${stat.suffix}`
                    }
                  </p>
                  <p className="text-zinc-500 text-[9px] uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </BentoCard>

          {/* Tech Stack - Frontend */}
          <BentoCard delay={0.2}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">Frontend</h3>
              <div className="flex items-center gap-2 text-[9px] text-zinc-600">
                <span className="text-pink-400">● Core</span>
                <span>◐ Good</span>
                <span>○ Learning</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {techGroups[0].skills.map(skill => (
                <span
                  key={skill.name}
                  className={`px-3 py-1 rounded-lg border text-[10px] uppercase font-bold tracking-widest transition-all hover:scale-105 ${tierColors[skill.level]}`}
                  title={`${skill.name} — ${skill.level}`}
                >
                  {tierLabels[skill.level]} {skill.name}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Tech Stack - Backend */}
          <BentoCard delay={0.3}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">Backend & DB</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techGroups[1].skills.map(skill => (
                <span
                  key={skill.name}
                  className={`px-3 py-1 rounded-lg border text-[10px] uppercase font-bold tracking-widest transition-all hover:scale-105 ${tierColors[skill.level]}`}
                >
                  {tierLabels[skill.level]} {skill.name}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Education */}
          <BentoCard delay={0.4}>
            <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-zinc-500">Education</h3>
            <div className="space-y-2">
              <p className="text-white font-bold leading-tight">Lovely Professional University</p>
              <p className="text-zinc-400 text-xs">Computer Science & Engineering</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="text-pink-500 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border border-pink-500/30 bg-pink-500/5">
                  CGPA: 8.02 / 10
                </div>
              </div>
              <p className="text-zinc-600 text-[10px] mt-2">2021 — 2025</p>
            </div>
          </BentoCard>

          {/* Tech Stack - Tools */}
          <BentoCard delay={0.5}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">Tools & 3D</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techGroups[2].skills.map(skill => (
                <span
                  key={skill.name}
                  className={`px-3 py-1 rounded-lg border text-[10px] uppercase font-bold tracking-widest transition-all hover:scale-105 ${tierColors[skill.level]}`}
                >
                  {tierLabels[skill.level]} {skill.name}
                </span>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
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

export default function About() {
  const container = useRef(null);
  const [repoCount, setRepoCount] = useState(15);
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    fetch('https://api.github.com/users/mayanksinghrajpoot')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.public_repos) setRepoCount(data.public_repos);
      })
      .catch(() => { });
  }, []);

  const stats = [
    { value: repoCount, suffix: '+', label: 'GitHub Repos', decimals: 0 },
    { value: 2, suffix: '+', label: 'Years Exp', decimals: 0 },
    { value: 8.02, suffix: '', label: 'CGPA', decimals: 1 },
  ];

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  // Smooth the scroll progress for Three.js animations
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 200,
    restDelta: 0.001
  });

  // Orchestration points
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const bentoY = useTransform(scrollYProgress, [0.3, 0.9], ["100vh", "-50vh"]);
  const bentoOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.9, 0.95], [0, 1, 1, 0]);

  return (
    <section id="about" ref={container} className="relative h-[400vh] bg-[#050505]">

      {/* Sticky Scroll Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

        {/* Layer 1: Background Headline (Z-0) */}
        <motion.div
          style={{ opacity: headerOpacity }}
          className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-4xl px-6">
            <ScrollReveal direction="up">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white/20 mb-6">
                The <span className="text-pink-500/20 italic">Curiosity</span> <GlitchText as="span" text="Lab" />
              </h2>
            </ScrollReveal>
            <div className="text-zinc-600 text-lg md:text-2xl font-medium tracking-tight">
              <SplitText delay={0.2} text="Where code finds its soul." />
            </div>
          </div>
        </motion.div>

        {/* Layer 2: 3D Model (Z-10) - Lazy-mounted for performance */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <About3DModel scrollProgress={smoothProgress} />
        </div>

        {/* Layer 3: Forensic Content (Z-20) - Scrolls 'In Front' */}
        <motion.div
          style={{ y: bentoY, opacity: bentoOpacity }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 md:px-12 pointer-events-none"
        >
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] pointer-events-auto">

            {/* Exp Card */}
            <BentoCard className="lg:col-span-2">
              <h3 className="text-white text-xs uppercase tracking-[0.3em] font-bold mb-6 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-pink-500"></span>
                The Evolution
              </h3>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-3">
                  <h4 className="text-white text-2xl font-bold leading-tight">Full Stack & 3D Web Explorer</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Navigating B.Tech at LPU while architecting high-impact solutions. From MERN-stack systems to AI-driven tools, my journey is driven by a desire to solve real-world problems with code that breathes.
                  </p>
                </div>
                {/* Stats */}
                <div ref={statsRef} className="grid grid-cols-3 gap-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
                      <p className="text-white text-2xl font-black leading-none">
                        {statsInView
                          ? <CountUp end={stat.value} decimals={stat.decimals} duration={2.5} suffix={stat.suffix} />
                          : `0${stat.suffix}`
                        }
                      </p>
                      <p className="text-zinc-500 text-[8px] uppercase tracking-widest mt-2">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </BentoCard>

            {/* Frontend Card */}
            <BentoCard>
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-5">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {techGroups[0].skills.map(skill => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1 rounded-lg border text-[9px] uppercase font-bold tracking-widest transition-all hover:scale-105 ${tierColors[skill.level]}`}
                  >
                    {tierLabels[skill.level]} {skill.name}
                  </span>
                ))}
              </div>
            </BentoCard>

            {/* Backend Card */}
            <BentoCard>
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-5">Backend & DB</h3>
              <div className="flex flex-wrap gap-2">
                {techGroups[1].skills.map(skill => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1 rounded-lg border text-[9px] uppercase font-bold tracking-widest transition-all hover:scale-105 ${tierColors[skill.level]}`}
                  >
                    {tierLabels[skill.level]} {skill.name}
                  </span>
                ))}
              </div>
            </BentoCard>

            {/* Education Card */}
            <BentoCard>
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold mb-6 text-zinc-500">Education</h3>
              <div className="space-y-2">
                <p className="text-white font-bold leading-tight">Lovely Professional University</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="text-pink-500 text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-lg border border-pink-500/30 bg-pink-500/5">
                    CGPA: 8.02 / 10
                  </div>
                </div>
                <p className="text-zinc-600 text-[10px] mt-2">Class of 2025</p>
              </div>
            </BentoCard>

            {/* Tools Card */}
            <BentoCard>
              <h3 className="text-white text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-5">Tools & 3D</h3>
              <div className="flex flex-wrap gap-2">
                {techGroups[2].skills.map(skill => (
                  <span
                    key={skill.name}
                    className={`px-3 py-1 rounded-lg border text-[9px] uppercase font-bold tracking-widest transition-all hover:scale-105 ${tierColors[skill.level]}`}
                  >
                    {tierLabels[skill.level]} {skill.name}
                  </span>
                ))}
              </div>
            </BentoCard>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

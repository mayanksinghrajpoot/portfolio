import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import ScrollReveal from '../components/ui/ScrollReveal';

const milestones = [
  {
    year: '2021',
    title: 'First Line of Code',
    desc: 'Wrote my first HTML page and fell in love with building things. Started with C++ for logic and problem solving.',
    icon: '💡',
    tag: 'The Beginning',
    color: '#ec4899',
  },
  {
    year: '2022',
    title: 'React Discovery',
    desc: 'Fell in love with component-based architecture. Spent months building small projects and consuming documentation.',
    icon: '⚛️',
    tag: 'Frontend Era',
    color: '#d946ef',
  },
  {
    year: '2023',
    title: 'Going Full Stack',
    desc: 'Mastered Node.js & Express. Built my first complete MERN stack app — connected everything end-to-end.',
    icon: '🚀',
    tag: 'MERN Unlocked',
    color: '#a855f7',
  },
  {
    year: '2024',
    title: 'Shipping Real Projects',
    desc: 'Deployed Elegance Enclave, Sports League, and Trip Planner. Learned PHP, MySQL, and real-world system design.',
    icon: '🏆',
    tag: '3 Projects Live',
    color: '#ec4899',
  },
  {
    year: '2025',
    title: 'AI + 3D Web Frontier',
    desc: 'Built Bright Path — an AI-powered learning platform. Went deep on Three.js, GLSL WebGL shaders, and immersive web experiences.',
    icon: '🧠',
    tag: 'Current Chapter',
    color: '#f43f5e',
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="journey" className="relative py-32 bg-[#050505] overflow-hidden" ref={containerRef}>
      
      {/* Background ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(236,72,153,0.03),transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="text-center md:text-left mb-24 max-w-4xl">
          <ScrollReveal direction="up">
            <span className="text-pink-500 text-[10px] uppercase tracking-[0.5em] font-bold block mb-6">Experience</span>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
              Career <span className="text-transparent" style={{ WebkitTextStroke: '2px #ec4899' }}>Timeline</span>
            </h2>
          </ScrollReveal>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          
          {/* Vertical Thread (Rail) */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
          
          {/* Animated Thread (Progress) */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 w-[1px] bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 -translate-x-1/2 origin-top"
            style={{ height: '100%', scaleY: springProgress }}
          />

          <div className="space-y-16 md:space-y-32">
            {milestones.map((milestone, i) => {
              const isEven = i % 2 === 0;
              return (
                <TimelineCard 
                  key={milestone.year} 
                  milestone={milestone} 
                  index={i} 
                  isEven={isEven} 
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

function TimelineCard({ milestone, index, isEven }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start shrink', 'center center'],
  });

  // Track scroll so when the scroll hits the card, the dot glows
  const dotScale = useTransform(scrollYProgress, [0, 1], [0.5, 1.2]);
  const dotOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

  return (
    <div 
      ref={cardRef} 
      className={`relative w-full flex items-center justify-between flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      
      {/* Central Dot */}
      <div className="absolute left-6 md:left-1/2 w-8 h-8 -translate-x-1/2 flex items-center justify-center z-20 top-6 md:top-1/2 md:-translate-y-1/2">
        <motion.div 
          className="w-4 h-4 rounded-full bg-zinc-950 border-2" 
          style={{ 
            borderColor: milestone.color,
            scale: dotScale,
            opacity: dotOpacity,
            boxShadow: `0 0 20px ${milestone.color}80`
          }} 
        />
      </div>

      {/* Spacer for alternating layout */}
      <div className="hidden md:block w-5/12" />

      {/* Content Card */}
      <div className="w-full pl-16 md:pl-0 md:w-5/12">
         <motion.div
           initial={{ opacity: 0, x: isEven ? 50 : -50, y: 30 }}
           whileInView={{ opacity: 1, x: 0, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           onMouseEnter={() => setIsHovered(true)}
           onMouseLeave={() => setIsHovered(false)}
           data-cursor="view"
           className="relative group block p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md overflow-hidden hover:border-white/10 transition-colors"
         >
           
           {/* Glassmorphic Hover Gradient */}
           <div 
             className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
             style={{
               background: `radial-gradient(circle at 50% -20%, ${milestone.color}20 0%, transparent 70%)`
             }}
           />

           {/* Watermark Year */}
           <div 
             className="absolute -bottom-6 -right-4 text-[120px] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter transition-transform duration-700 group-hover:-translate-y-4"
           >
             {milestone.year}
           </div>

           <div className="relative z-10">
             <div className="flex items-center justify-between mb-6">
               <span className="text-4xl drop-shadow-lg">{milestone.icon}</span>
               <span 
                 className="text-[9px] uppercase tracking-widest font-black px-4 py-1.5 rounded-full border bg-zinc-950/50"
                 style={{ color: milestone.color, borderColor: `${milestone.color}40` }}
               >
                 {milestone.tag}
               </span>
             </div>

             <div className="text-zinc-500 font-mono text-xs mb-2 tracking-widest">
               {milestone.year}
             </div>
             
             <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-pink-400 transition-colors duration-300">
               {milestone.title}
             </h3>
             
             <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
               {milestone.desc}
             </p>

           </div>
         </motion.div>
      </div>

    </div>
  );
}

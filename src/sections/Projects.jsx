import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ProjectImageDistortion from '../components/canvas/ProjectImageDistortion';
import ProjectModal from '../components/ui/ProjectModal';
import brightpath from '../images/brightpath.png';
import chatbot from '../images/chatbot.png';
import elegance from '../images/elegance.png';
import smai from '../images/smai.png';

const projects = [
  {
    title: 'Bright Path',
    category: 'AI / Full Stack',
    year: '2025',
    color: 'bg-[#ec4899]', // Pink
    image: brightpath,
    live: 'https://bright-path-5m28.onrender.com',
    github: 'https://github.com/mayanksinghrajpoot/BrightPath',
    tech: ['React.js', 'Tailwind', 'Node.js', 'Express.js', 'AI']
  },
  {
    title: 'Sports League',
    category: 'Management System',
    year: '2024',
    color: 'bg-[#6366f1]', // Indigo
    image: smai,
    live: 'http://sports-league.infy.uk/',
    github: 'https://github.com/mayanksinghrajpoot/sports-league-management-system',
    tech: ['HTML', 'JavaScript', 'Tailwind', 'PHP', 'MySQL']
  },
  {
    title: 'Trip Planner',
    category: 'AI Chatbot',
    year: '2024',
    color: 'bg-[#10b981]', // Emerald
    image: chatbot,
    live: 'https://poetic-kleicha-66e678.netlify.app/',
    github: 'https://github.com/Mayanksingh108/netflix-gpt',
    tech: ['HTML', 'CSS', 'JavaScript', 'AI']
  },
  {
    title: 'Elegance Enclave',
    category: 'Booking System',
    year: '2024',
    color: 'bg-[#f59e0b]', // Amber
    image: elegance,
    live: 'https://my-salon.netlify.app/',
    github: 'https://github.com/mayanksinghrajpoot/my-salon',
    tech: ['HTML', 'CSS', 'JavaScript']
  }
];

export default function Projects() {
  const container = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section id="work" ref={container} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-6 md:px-12">
        {/* Decorative background typography with parallax */}
        <motion.div 
          style={{ y: bgY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] md:text-[20vw] font-black tracking-tighter text-white/[0.03] whitespace-nowrap pointer-events-none z-0 mix-blend-overlay"
        >
          SELECTED WORKS
        </motion.div>
        <div className="w-full max-w-7xl mb-8 md:mb-12">
          <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white flex items-center gap-8">
            Selected <span className="text-pink-500 italic font-medium">Work</span>
            <div className="h-[2px] bg-white/20 flex-1 hidden md:block"></div>
          </h2>
        </div>
        
        <div className="relative w-full max-w-7xl aspect-[4/3] md:aspect-[21/9]">
          {projects.map((project, i) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={i} 
              progress={scrollYProgress} 
              total={projects.length}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      <ProjectModal 
        project={activeProject} 
        isOpen={!!activeProject} 
        onClose={() => setActiveProject(null)} 
      />
    </section>
  );
}

function ProjectCard({ project, index, progress, total, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Map scroll progress to animations
  const interval = 1 / (total - 1); // 0.33 for 4 items
  
  // y animation (slide up from below)
  const startSlide = Math.max(0, (index - 1) * interval);
  const endSlide = index * interval;
  
  const yRange = index === 0 ? [0, 1] : [startSlide, endSlide];
  const yOutput = index === 0 ? ["0%", "0%"] : ["150%", "0%"];
  const y = useTransform(progress, yRange, yOutput);
  
  // Scale animation (scale down as newer cards stack on top)
  const scaleStart = index === 0 ? 0 : endSlide;
  const targetScale = 1 - ((total - 1 - index) * 0.05); // shrinks by 5% per layer
  const scale = useTransform(progress, [scaleStart, 1], [1, targetScale]);

  // Opacity (darken slightly as it gets buried)
  const opacityStart = index === 0 ? 0 : endSlide;
  const targetOpacity = 1 - ((total - 1 - index) * 0.15);
  const opacity = useTransform(progress, [opacityStart, 1], [1, targetOpacity]);

  return (
    <motion.div 
      style={{ 
        y, 
        scale, 
        opacity,
        zIndex: index, 
        transformOrigin: "top center",
        top: `${index * 12}px` // subtle offset to simulate physical stacking
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      data-cursor="view"
      className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden group cursor-pointer shadow-2xl shadow-black/50 border border-white/10 bg-zinc-950 will-change-transform project-card"
    >
      {/* Background tint based on project color */}
      <div className={`absolute inset-0 ${project.color} opacity-20 transition-opacity duration-700 group-hover:opacity-40 z-10 pointer-events-none`} />
      
      {/* WebGL Image Distortion */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black z-0">
        <ProjectImageDistortion imageSrc={project.image} isHovered={isHovered} />
      </div>

      {/* Content */}
      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between mix-blend-normal pointer-events-none text-white z-20">
        <div className="flex justify-between items-start drop-shadow-lg">
          <span className="text-xs uppercase tracking-widest font-medium opacity-90 drop-shadow-md">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-xs uppercase tracking-widest font-medium opacity-90 drop-shadow-md">
            {project.year}
          </span>
        </div>
        
        <div className="pointer-events-auto">
          <h2 className="text-4xl md:text-[6vw] font-bold uppercase tracking-tighter mb-2 transition-transform duration-500 origin-left group-hover:scale-105 drop-shadow-lg leading-none">
            {project.title}
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
            <p className="text-sm md:text-base uppercase tracking-widest font-medium text-pink-400 drop-shadow-md">
              {project.category}
            </p>
            <div className="flex flex-wrap gap-2 md:gap-4 mt-2 md:mt-0">
              <a href={project.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-[10px] md:text-xs font-semibold uppercase tracking-widest hover:text-pink-400 transition-colors bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-center">
                GitHub
              </a>
              <a href={project.live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-[10px] md:text-xs font-semibold uppercase tracking-widest hover:text-white text-black transition-colors bg-pink-500 hover:bg-pink-600 px-4 py-2 rounded-full border border-pink-500/50 text-center shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                Live Site
              </a>
            </div>
          </div>
          <div className="hidden md:flex flex-wrap gap-2 mt-4 md:mt-6">
            {project.tech.map(tech => (
              <span key={tech} className="text-[10px] uppercase tracking-widest font-medium bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}


import { useRef, useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';

export default function TechGrid({ techGroups }) {
  // Add subtle continuous floating movement
  const [time, setTime] = useState(0);
  
  useAnimationFrame((t) => {
    setTime(t / 1000);
  });

  return (
    <div className="space-y-12 pl-4 md:pl-12 w-full">
      {techGroups.map((group, groupIndex) => (
        <div key={group.category} className="space-y-6">
          <h4 className="text-sm font-medium text-pink-500 uppercase tracking-widest flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-pulse"></span>
            {group.category}
          </h4>
          
          <div className="flex flex-wrap gap-3">
            {group.skills.map((tech, i) => (
              <motion.div
                key={tech}
                className="relative group cursor-none"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                   duration: 0.5, 
                   delay: (groupIndex * 0.1) + (i * 0.05),
                   type: "spring",
                   stiffness: 100
                }}
                // Continuous floating math
                style={{
                  y: Math.sin(time + i * 0.5) * 3,
                }}
              >
                {/* Techy Border effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm mix-blend-screen" />
                <span className="absolute inset-[1px] bg-zinc-950 rounded-[1px] z-10" />
                
                <span className="relative z-20 block px-5 py-2.5 border border-white/10 group-hover:border-transparent rounded-sm text-xs font-medium uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors duration-300 bg-black/40 backdrop-blur-sm overflow-hidden">
                   {/* Scanning line effect on hover */}
                   <span className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] group-hover:animate-[scan_1s_ease-in-out_infinite]" />
                   {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

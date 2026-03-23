import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden flex flex-col pointer-events-auto shadow-2xl shadow-black shadow-[0_0_50px_rgba(236,72,153,0.1)]"
          >
            {/* Header image area */}
            <div className="relative w-full h-[30vh] md:h-[45vh] bg-black overflow-hidden flex-shrink-0">
              <div className={`absolute inset-0 ${project.color} opacity-20`} />
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full bg-black/50 hover:bg-white/10 text-white backdrop-blur-md transition-colors border border-white/10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content area */}
            <div className="flex-1 overflow-y-auto p-6 md:p-12 no-scrollbar">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-2">
                    {project.category} • {project.year}
                  </p>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                    {project.title}
                  </h2>
                </div>
                <div className="flex gap-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    <Github size={16} /> Code
                  </a>
                  <a 
                    href={project.live} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                  >
                    <ExternalLink size={16} /> Live
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-6">
                  <h3 className="text-white text-lg font-bold uppercase tracking-widest">About the Project</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    This is a comprehensive case study of {project.title}. Designed and developed to solve specific problems in its domain, focusing on premium user experience, high performance, and robust architecture.
                  </p>
                  <p className="text-zinc-400 leading-relaxed">
                    The development journey involved tackling various technical challenges such as state management, real-time data synchronization, and crafting smooth 60fps animations that enhance the overall interaction without compromising accessibility.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Core Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(tech => (
                        <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-bold uppercase tracking-widest">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Role</h3>
                    <p className="text-zinc-400 text-sm">Lead Developer<br/>UI/UX Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import { motion } from 'framer-motion';

export default function BentoCard({ children, className = '', span = 'col-span-1', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className={`relative group bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-3xl overflow-hidden p-8 ${span} ${className} transition-all duration-300 hover:border-pink-500/30 hover:bg-zinc-900/60`}
    >
      {/* Subtle Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </motion.div>
  );
}

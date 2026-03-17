import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function CVTrigger({ onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="fixed bottom-8 right-8 z-[90] p-4 md:p-5 rounded-2xl bg-zinc-900 border border-zinc-800 text-white shadow-2xl backdrop-blur-md hover:border-pink-500/50 hover:bg-zinc-800 transition-all group flex items-center gap-3"
    >
      <div className="absolute inset-0 bg-pink-500/10 rounded-2xl blur-xl group-hover:bg-pink-500/20 transition-all opacity-0 group-hover:opacity-100" />
      <span className="text-xs uppercase font-bold tracking-[0.2em] pointer-events-none hidden md:block pl-2">View CV</span>
      <div className="p-2 rounded-xl bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:shadow-[0_0_25px_rgba(236,72,153,0.8)] transition-all">
        <FileText className="w-5 h-5 md:w-6 h-6" />
      </div>
    </motion.button>
  );
}

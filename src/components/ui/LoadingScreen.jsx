import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    // Simulate asset loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            if (onComplete) setTimeout(onComplete, 800);
          }, 400);
          return 100;
        }
        // Increase progress randomly
        return Math.min(100, prev + Math.floor(Math.random() * 8) + 2);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []); // Only run once on mount

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] bg-[#050505] flex flex-col items-center justify-center pointer-events-auto"
        >
          {/* Logo / Text */}
          <div className="relative overflow-hidden mb-8 text-center">
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white"
            >
              Mayank<span className="text-pink-500">.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold mt-2"
            >
              Initializing WebGL Environment
            </motion.p>
          </div>

          {/* Progress Bar Container */}
          <div className="w-64 md:w-96 relative">
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-[1px] w-full bg-zinc-800 origin-left"
            />
            {/* Progress Fill */}
            <motion.div
              className="absolute top-0 left-0 h-[1px] bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "circOut", duration: 0.2 }}
            />
          </div>

          {/* Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-4 text-pink-500 text-xs font-bold font-mono tracking-widest"
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

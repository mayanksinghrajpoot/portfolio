import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, User, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

import cvFile from '../../images/My_CV (1).pdf';

export default function CVModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-xl"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl h-[90vh] overflow-hidden bg-zinc-950 border border-zinc-800 rounded-[2rem] flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-zinc-900 bg-zinc-950/50">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-pink-500" />
              <h2 className="text-white font-bold uppercase tracking-widest text-sm">Curriculum Vitae</h2>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href={cvFile}
                download="Mayank_Singh_CV.pdf"
                className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-pink-500/50 transition-all flex items-center gap-2"
                title="Download CV"
              >
                <Download className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Download</span>
              </a>
              <button 
                onClick={onClose}
                className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-pink-500/50 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 overflow-hidden bg-zinc-900/20">
            <iframe 
              src={`${cvFile}#toolbar=0&navpanes=0&scrollbar=0`}
              className="w-full h-full border-none"
              title="CV Viewer"
            />
          </div>

          {/* Footer gradient */}
          <div className="h-6 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none absolute bottom-0 left-0 right-0 z-20" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

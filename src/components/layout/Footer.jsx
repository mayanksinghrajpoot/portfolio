import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Github, Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative w-full py-24 px-6 md:px-12 bg-black text-white overflow-hidden flex flex-col justify-between min-h-[50vh]">
      <div className="z-10 flex flex-col gap-4 max-w-4xl">
        <h2 className="text-4xl md:text-6xl tracking-tighter uppercase font-bold leading-none">
          That's me<br />
          <span className="text-zinc-600">Let's build something together.</span>
        </h2>
        {/* <p className="text-sm leading-relaxed mb-8">
              Creative Developer exploring the intersection of high-performance web architecture and immersive 3D experiences.
            </p> */}
        <div className="flex gap-4">
          <a href="https://github.com/mayanksinghrajpoot" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-pink-500/50 hover:text-pink-400 transition-all duration-300">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/mayank-singh-rajpoot-910b29297" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-pink-500/50 hover:text-pink-400 transition-all duration-300">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:mayanksinghrajpoot01@gmail.com" className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-pink-500/50 hover:text-pink-400 transition-all duration-300">
            <Mail className="w-5 h-5" />
          </a>
        </div>
        {/* </div> */}

        <div className="grid grid-cols-2 gap-16">
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#about" className="hover:text-pink-500 transition-colors">About</a></li>
              <li><a href="#services" className="hover:text-pink-500 transition-colors">Services</a></li>
              <li><a href="#projects" className="hover:text-pink-500 transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-pink-500 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-6">Socials</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="https://www.linkedin.com/in/mayank-singh-rajpoot-910b29297" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/mayanksinghrajpoot" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors">GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-xs text-zinc-600 uppercase tracking-widest">
          © {new Date().getFullYear()} — Handcrafted by <span className="text-zinc-400">Mayank Singh Rajpoot</span>
        </p>
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-3 text-xs text-zinc-500 uppercase tracking-widest hover:text-white transition-colors"
        >
          Back to top
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-pink-500/50 group-hover:bg-pink-500/5 transition-all duration-300">
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </div>
        </button>
      </div>

      {/* </div> */}
    </footer >
  );
}

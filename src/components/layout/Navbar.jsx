import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { playHoverSound } from '../../utils/audio';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    window.isMuted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['about', 'work', 'contact'];
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 transition-all duration-500 ${
          scrolled
            ? 'py-4 bg-black/70 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20'
            : 'py-6 bg-transparent'
        }`}
      >
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-bold tracking-tighter uppercase text-white hover:text-pink-400 transition-colors z-50"
        >
          Mayank<span className="text-pink-500">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                onMouseEnter={playHoverSound}
                className={`relative text-xs font-bold uppercase tracking-[0.2em] transition-colors duration-300 group ${
                  isActive ? 'text-pink-500' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
                {/* Active underline */}
                <span
                  className={`absolute -bottom-1 left-0 h-[1px] bg-pink-500 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA & Sound Toggle */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-all"
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          
          <a
            href="#contact"
            onMouseEnter={playHoverSound}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full border border-pink-500/40 bg-pink-500/10 text-pink-400 hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-[5px] w-6">
            <span className={`block h-[1.5px] bg-white origin-center transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block h-[1.5px] bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-[1.5px] bg-white origin-center transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </div>
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-10 md:hidden"
        >
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setMobileOpen(false)}
              className="text-4xl font-bold uppercase tracking-tighter text-white hover:text-pink-500 transition-colors"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 rounded-full bg-pink-500 text-white font-bold uppercase tracking-widest text-sm"
          >
            Hire Me
          </motion.a>
        </motion.div>
      )}
    </>
  );
}

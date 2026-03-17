import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 pointer-events-none"
    >
      <div className="text-xl font-bold tracking-tighter uppercase pointer-events-auto mix-blend-difference z-50 text-white">
        Mayank Singh
      </div>
      
      <nav className="hidden md:flex gap-10 pointer-events-auto mix-blend-difference text-white">
        {['About', 'Exploration', 'Projects', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-bold uppercase tracking-[0.2em] hover:text-pink-500 transition-colors">
            {item}
          </a>
        ))}
      </nav>

      {/* Mobile Menu Button Outline */}
      <button className="md:hidden pointer-events-auto mix-blend-difference text-white">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 16H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </motion.header>
  );
}

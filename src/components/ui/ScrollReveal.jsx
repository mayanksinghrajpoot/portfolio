import { motion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, direction = "up", className = "", width = "auto" }) {
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction], filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like ease
      className={className}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}

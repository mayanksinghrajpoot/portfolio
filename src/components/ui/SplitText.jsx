import { motion } from 'framer-motion';

export default function SplitText({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay }
    }
  };

  const child = {
    visible: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' },
    hidden: { opacity: 0, y: 20, rotateX: -45, filter: 'blur(5px)' }
  };

  return (
    <motion.div 
      style={{ overflow: "hidden", display: "inline-flex", flexWrap: "wrap", perspective: "800px" }} 
      variants={container} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {words.map((word, index) => (
        <span key={index} style={{ overflow: "hidden", display: "inline-flex", paddingRight: "0.25em" }}>
          <motion.span variants={child} transition={{ type: "spring", damping: 15, stiffness: 200 }} className={className}>
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

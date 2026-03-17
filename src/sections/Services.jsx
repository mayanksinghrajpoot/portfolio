import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Monitor, Cpu, Palette, Globe, Layers } from 'lucide-react';

const services = [
  {
    title: 'Full-Stack Development',
    description: 'Building robust, scalable web applications from frontend to backend using modern MERN stack and Next.js.',
    icon: <Code2 className="w-8 h-8 text-pink-500" />,
  },
  {
    title: '3D Web Experiences',
    description: 'Integrating immersive 3D models and interactive scenes into the web using Three.js and React Three Fiber.',
    icon: <Layers className="w-8 h-8 text-pink-500" />,
  },
  {
    title: 'Custom UI/UX Solutions',
    description: 'Designing and implementing high-converting, user-centric interfaces with a focus on premium aesthetics.',
    icon: <Palette className="w-8 h-8 text-pink-500" />,
  },
  {
    title: 'Progressive Web Apps',
    description: 'Creating high-performance PWAs that work seamlessly across devices with offline capabilities.',
    icon: <Globe className="w-8 h-8 text-pink-500" />,
  },
  {
    title: 'Frontend Architecture',
    description: 'Optimizing and structuring large-scale frontend projects for maximum performance and maintainability.',
    icon: <Cpu className="w-8 h-8 text-pink-500" />,
  },
  {
    title: 'Responsive Design',
    description: 'Ensuring your application looks stunning and functions perfectly on every screen size.',
    icon: <Monitor className="w-8 h-8 text-pink-500" />,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function Services() {
  return (
    <section id="exploration" className="py-32 px-6 md:px-12 bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-4"
          >
            Technical <span className="text-pink-500">Exploration</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto"
          >
            I spend my time deep-diving into the latest tech to see what's possible when design and code collide.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                backgroundColor: 'rgba(236, 72, 153, 0.05)',
                borderColor: 'rgba(236, 72, 153, 0.4)',
              }}
              className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm transition-all duration-300 group"
            >
              <div className="mb-6 p-4 rounded-2xl bg-zinc-800 inline-block group-hover:bg-pink-500/10 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-white text-xl font-bold mb-4 uppercase tracking-wider group-hover:text-pink-500 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

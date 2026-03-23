import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import GlitchText from '../components/ui/GlitchText';
import ScrollReveal from '../components/ui/ScrollReveal';
import { playHoverSound } from '../utils/audio';

const skills = [
  { name: 'React', level: 'core' },
  { name: 'Next.js', level: 'core' },
  { name: 'Node.js', level: 'core' },
  { name: 'Three.js', level: 'proficient' },
  { name: 'TypeScript', level: 'proficient' },
  { name: 'MongoDB', level: 'proficient' },
  { name: 'Express', level: 'core' },
  { name: 'Tailwind', level: 'core' },
  { name: 'Framer', level: 'proficient' },
  { name: 'Redux', level: 'familiar' },
  { name: 'GSAP', level: 'proficient' },
  { name: 'Git', level: 'core' },
  { name: 'Figma', level: 'proficient' },
  { name: 'Vercel', level: 'proficient' },
  { name: 'PHP', level: 'familiar' },
  { name: 'MySQL', level: 'familiar' },
  { name: 'WebGL', level: 'proficient' },
  { name: 'R3F', level: 'proficient' },
  { name: 'Postman', level: 'familiar' },
  { name: 'C++', level: 'familiar' },
  { name: 'HTML', level: 'core' },
  { name: 'CSS', level: 'core' },
];

const tierColor = {
  core: '#ec4899',
  proficient: '#a1a1aa',
  familiar: '#52525b',
};

// Evenly distribute points on a sphere using Fibonacci lattice
function fibonacciSphere(count, radius) {
  const pts = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push([
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ]);
  }
  return pts;
}

function TagCloud() {
  const positions = fibonacciSphere(skills.length, 3.5);
  const [hoverIdx, setHoverIdx] = useState(null);

  return (
    <>
      {/* Central glowing sphere */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.5}
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={3} color="#ec4899" distance={8} />

      {/* Skill tags */}
      {skills.map((skill, i) => (
        <Html key={skill.name} position={positions[i]} center>
          <motion.div
            onMouseEnter={() => { setHoverIdx(i); playHoverSound(); }}
            onMouseLeave={() => setHoverIdx(null)}
            animate={{ scale: hoverIdx === i ? 1.4 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer whitespace-nowrap transition-all duration-200 select-none"
            style={{
              color: hoverIdx === i ? '#ec4899' : tierColor[skill.level],
              background: hoverIdx === i ? 'rgba(236,72,153,0.15)' : 'rgba(0,0,0,0.4)',
              border: `1px solid ${hoverIdx === i ? 'rgba(236,72,153,0.5)' : 'rgba(255,255,255,0.06)'}`,
              backdropFilter: 'blur(4px)',
              textShadow: hoverIdx === i ? '0 0 12px rgba(236,72,153,0.8)' : 'none',
            }}
          >
            {skill.name}
          </motion.div>
        </Html>
      ))}
    </>
  );
}

export default function SkillsGlobe() {
  return (
    <section id="exploration" className="relative py-24 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* Background glow */}
      <div className="relative z-10 md:left-12 md:top-24 pointer-events-none">
        <ScrollReveal direction="left">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none mix-blend-difference">
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #ec4899' }}>Skill</span>
            <br />
            <GlitchText text="Arsenal" />
          </h2>
        </ScrollReveal>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* <div className="absolute top-12 md:top-24 left-6 md:left-12 z-10 pointer-events-none"> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-md">
              I specialize in transforming complex ideas into elegant, high-performing digital realities — from pixel-perfect UIs to immersive 3D web experiences.
            </p>

            {/* Skill tier legend */}
            <div className="flex flex-col gap-3 mb-10">
              {[
                { level: 'core', label: 'Core — I build production apps with this daily', dot: '#ec4899' },
                { level: 'proficient', label: 'Proficient — Comfortable in projects', dot: '#a1a1aa' },
                { level: 'familiar', label: 'Familiar — Learning & applying', dot: '#52525b' },
              ].map(({ label, dot }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dot }} />
                  <span className="text-zinc-400 text-xs">{label}</span>
                </div>
              ))}
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-pink-500 text-white font-bold uppercase tracking-widest text-xs hover:bg-pink-600 transition-colors shadow-[0_0_30px_rgba(236,72,153,0.4)]"
            >
              Let's Build Together →
            </motion.a>
          </motion.div>

          {/* Right: 3D Tag Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-[500px] lg:h-[600px] relative"
          >
            <Canvas camera={{ position: [0, 0, 7], fov: 50 }} gl={{ antialias: true, alpha: true }}>
              <ambientLight intensity={0.1} />
              <pointLight position={[5, 5, 5]} intensity={0.5} color="#ec4899" />
              <Suspense fallback={null}>
                <TagCloud />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.6}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI * 3 / 4}
              />
            </Canvas>
            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-zinc-600 text-[9px] uppercase tracking-widest text-center">
              Drag to explore • Hover to highlight
            </p>
          </motion.div>

        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

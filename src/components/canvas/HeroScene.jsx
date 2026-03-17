import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm({ count = 5000 }) {
  const pointsRef = useRef();

  // Generate random spherical distribution
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 5 + Math.random() * 20; 
        
        p[i * 3] = radius * Math.sin(phi) * Math.cos(theta);     // x
        p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
        p[i * 3 + 2] = radius * Math.cos(phi);                   // z
    }
    return p;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
        // Subtle ambient rotation
      pointsRef.current.rotation.y = time * 0.05;
      pointsRef.current.rotation.z = time * 0.02;

      // Mouse parallax to follow cursor
      const mouseX = (state.pointer.x * Math.PI) / 8;
      const mouseY = (state.pointer.y * Math.PI) / 8;
      
      pointsRef.current.rotation.x += (mouseY - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.y += (mouseX - pointsRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ec4899"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 15], fov: 75 }} gl={{ antialias: true, alpha: false }}>
        <fog attach="fog" args={['#050505', 10, 25]} />
        <ParticleSwarm count={3500} />
      </Canvas>
      
      {/* Bottom fade mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

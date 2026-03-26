// import { useRef, useMemo, useState, useEffect } from 'react';
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { Points } from '@react-three/drei';
// import * as THREE from 'three';

// // ============================================================
// // GLSL Shaders — GPU fluid noise for zero-CPU-overhead
// // ============================================================
// const vertexShader = `
// uniform float uTime;
// uniform vec2 uMouse;
// attribute vec3 originalPosition;
// varying float vDepth;
// varying float vDistToMouse;

// // Simplex 3D Noise (GPU)
// vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
// vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
// vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
// vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
// float snoise(vec3 v) {
//   const vec2 C = vec2(1.0/6.0, 1.0/3.0);
//   const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
//   vec3 i  = floor(v + dot(v, C.yyy));
//   vec3 x0 = v - i + dot(i, C.xxx);
//   vec3 g = step(x0.yzx, x0.xyz);
//   vec3 l = 1.0 - g;
//   vec3 i1 = min(g.xyz, l.zxy);
//   vec3 i2 = max(g.xyz, l.zxy);
//   vec3 x1 = x0 - i1 + C.xxx;
//   vec3 x2 = x0 - i2 + C.yyy;
//   vec3 x3 = x0 - D.yyy;
//   i = mod289(i); 
//   vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
//   float n_ = 0.142857142857;
//   vec3 ns = n_ * D.wyz - D.xzx;
//   vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
//   vec4 x_ = floor(j * ns.z);
//   vec4 y_ = floor(j - 7.0 * x_);
//   vec4 x = x_ *ns.x + ns.yyyy;
//   vec4 y = y_ *ns.x + ns.yyyy;
//   vec4 h = 1.0 - abs(x) - abs(y);
//   vec4 b0 = vec4(x.xy, y.xy);
//   vec4 b1 = vec4(x.zw, y.zw);
//   vec4 s0 = floor(b0)*2.0 + 1.0;
//   vec4 s1 = floor(b1)*2.0 + 1.0;
//   vec4 sh = -step(h, vec4(0.0));
//   vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
//   vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
//   vec3 p0 = vec3(a0.xy, h.x);
//   vec3 p1 = vec3(a0.zw, h.y);
//   vec3 p2 = vec3(a1.xy, h.z);
//   vec3 p3 = vec3(a1.zw, h.w);
//   vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
//   p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
//   vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
//   m = m * m;
//   return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
// }

// void main() {
//   vec3 pos = originalPosition;

//   // Layered noise for organic fluid motion
//   float t = uTime * 0.18;
//   float n1 = snoise(vec3(pos.x * 0.12, pos.y * 0.12, t));
//   float n2 = snoise(vec3(pos.y * 0.12, pos.z * 0.12, t + 1.5));
//   float n3 = snoise(vec3(pos.z * 0.12, pos.x * 0.12, t + 3.0));

//   pos.x += n1 * 2.0;
//   pos.y += n2 * 2.0;
//   pos.z += n3 * 2.0;

//   // Mouse repulsion effect
//   vec2 mouseWorld = uMouse * 18.0;
//   float distToMouse = length(pos.xy - mouseWorld);
//   float repulse = smoothstep(4.0, 0.0, distToMouse) * 3.0;
//   pos.xy += normalize(pos.xy - mouseWorld) * repulse;

//   vDistToMouse = distToMouse;

//   vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
//   gl_Position = projectionMatrix * mvPosition;
//   gl_PointSize = (2.5 * 15.0) / -mvPosition.z;
//   vDepth = mvPosition.z;
// }
// `;

// const fragmentShader = `
// uniform vec3 uColor;
// uniform vec3 uColorB;
// varying float vDepth;
// varying float vDistToMouse;

// void main() {
//   float dist = length(gl_PointCoord - vec2(0.5));
//   if (dist > 0.5) discard;

//   // Soft additive glow
//   float alpha = smoothstep(0.5, 0.05, dist) * 0.85;

//   // Color shift near mouse
//   float mouseInfluence = smoothstep(4.0, 0.0, vDistToMouse);
//   vec3 col = mix(uColor, uColorB, mouseInfluence);

//   gl_FragColor = vec4(col, alpha);
// }
// `;

// // ============================================================
// // Gyroscope Hook
// // ============================================================
// function useGyroscope() {
//   const [gyro, setGyro] = useState({ x: 0, y: 0 });
//   useEffect(() => {
//     const isTouch = !window.matchMedia('(pointer: fine)').matches;
//     if (!isTouch) return;
//     const handler = (e) => {
//       if (!e.gamma || !e.beta) return;
//       setGyro({
//         x: Math.max(-1, Math.min(1, e.gamma / 45)),
//         y: Math.max(-1, Math.min(1, (e.beta - 45) / 45)),
//       });
//     };
//     window.addEventListener('deviceorientation', handler);
//     return () => window.removeEventListener('deviceorientation', handler);
//   }, []);
//   return gyro;
// }

// // ============================================================
// // Particle Swarm — uses GPU shader + mouse repulsion
// // ============================================================
// function ParticleSwarm({ count = 4500, gyro }) {
//   const pointsRef = useRef();
//   const { pointer } = useThree();

//   const { positions, originalPositions } = useMemo(() => {
//     const p = new Float32Array(count * 3);
//     for (let i = 0; i < count; i++) {
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.acos((Math.random() * 2) - 1);
//       // Bi-modal radial distribution: tight inner core + sparse outer shell
//       const rand = Math.random();
//       const radius = rand < 0.4 ? 4 + Math.random() * 5 : 9 + Math.random() * 18;
//       p[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
//       p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
//       p[i * 3 + 2] = radius * Math.cos(phi);
//     }
//     return { positions: p, originalPositions: p.slice() };
//   }, [count]);

//   const uniforms = useMemo(() => ({
//     uTime: { value: 0 },
//     uMouse: { value: new THREE.Vector2(0, 0) },
//     uColor: { value: new THREE.Color('#ec4899') },
//     uColorB: { value: new THREE.Color('#ff6eb4') }, // brighter pink near cursor
//   }), []);

//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     const mat = pointsRef.current?.material;
//     if (!mat) return;

//     mat.uniforms.uTime.value = time;
//     mat.uniforms.uMouse.value.set(pointer.x, pointer.y);

//     // Ambient rotation
//     pointsRef.current.rotation.y = time * 0.04;
//     pointsRef.current.rotation.z = time * 0.015;

//     // Desktop mouse OR mobile gyro parallax
//     const isDesktop = window.matchMedia('(pointer: fine)').matches;
//     const px = isDesktop ? pointer.x : gyro.x;
//     const py = isDesktop ? pointer.y : gyro.y;

//     const targetX = (py * Math.PI) / 7;
//     const targetY = (px * Math.PI) / 7;
//     pointsRef.current.rotation.x += (targetX - pointsRef.current.rotation.x) * 0.04;
//     pointsRef.current.rotation.y += (targetY - pointsRef.current.rotation.y) * 0.04;
//   });

//   return (
//     <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
//       <bufferAttribute
//         attach="geometry-attributes-originalPosition"
//         count={count}
//         array={originalPositions}
//         itemSize={3}
//       />
//       <shaderMaterial
//         vertexShader={vertexShader}
//         fragmentShader={fragmentShader}
//         uniforms={uniforms}
//         transparent
//         depthWrite={false}
//         blending={THREE.AdditiveBlending}
//       />
//     </Points>
//   );
// }

// // ============================================================
// // Main HeroScene export
// // ============================================================
// export default function HeroScene() {
//   const gyro = useGyroscope();
//   return (
//     <div className="absolute inset-0 z-0 bg-[#050505]">
//       <Canvas
//         camera={{ position: [0, 0, 18], fov: 70 }}
//         gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
//         dpr={[1, 1.5]}
//       >
//         <fog attach="fog" args={['#050505', 10, 30]} />
//         <ParticleSwarm count={4500} gyro={gyro} />
//       </Canvas>
//       <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
//       {/* Radial glow behind the hero text */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(236,72,153,0.08),transparent)] pointer-events-none" />
//     </div>
//   );
// }


import { useRef, useMemo, useState, useEffect } from 'react';
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
      // pointsRef.current.rotation.x = time * 0.05;
      pointsRef.current.rotation.z = time * 0.02;

      // Mouse parallax to follow cursor
      const mouseX = (state.pointer.x * Math.PI) / 8;
      const mouseY = (state.pointer.y * Math.PI) / 8;

      pointsRef.current.rotation.x += (mouseY - pointsRef.current.rotation.x) * 0.08;
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
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ antialias: false, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <fog attach="fog" args={['#050505', 10, 25]} />
        <ParticleSwarm count={2000} />
      </Canvas>

      {/* Bottom fade mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

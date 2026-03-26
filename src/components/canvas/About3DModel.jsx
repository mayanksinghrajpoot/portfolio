import { useRef, useState, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, Noise, Vignette, BrightnessContrast } from '@react-three/postprocessing';
import {
  Float,
  PerspectiveCamera,
  useGLTF,
  ContactShadows,
  Environment,
  SpotLight,
} from '@react-three/drei';
import * as THREE from 'three';

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

import avatarModel from '../../images/optimized_avatar.glb';

// Preload the model for faster access
useGLTF.preload(avatarModel, false, false, (loader) => {
  loader.setMeshoptDecoder(MeshoptDecoder);
});

function Avatar({ scrollProgress }) {
  const { scene } = useGLTF(avatarModel, false, false, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      const prog = typeof scrollProgress === 'object' ? scrollProgress.get() : scrollProgress;

      // 1. HYBRID SCROLL-STUCK LOGIC
      // Phase 1 (0 to 0.35 scroll): Model moves into center focus
      // Phase 2 (0.35 to 1.0 scroll): Model stays perfectly 'stuck'

      const transitionEnd = 0.35;
      const t = THREE.MathUtils.smoothstep(prog, 0, transitionEnd); // Normalized 0-1 for phase 1

      // Transition paths
      const targetScale = THREE.MathUtils.lerp(5.2, 7.0, t);
      const targetX = THREE.MathUtils.lerp(2.5, 0, t);
      const targetY = THREE.MathUtils.lerp(-4.5, -8.0, t);
      const targetZ = THREE.MathUtils.lerp(-2, 0, t);

      group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.1));
      group.current.position.set(
        THREE.MathUtils.lerp(group.current.position.x, targetX, 0.1),
        THREE.MathUtils.lerp(group.current.position.y, targetY, 0.1),
        THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.1)
      );

      // 2. EXPERT MOUSE TRACKING (Constant gaze)
      const baseRotationY = 4.71;
      const lookYaw = state.mouse.x * 0.9;
      const lookPitch = -state.mouse.y * 0.4;
      const lookRoll = -state.mouse.x * 0.15;

      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, baseRotationY + lookYaw, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, lookPitch, 0.05);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, lookRoll, 0.05);
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.05}>
      <group ref={group} scale={5.2} position={[2.5, -4.5, -2]}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

function BackdropGlow({ scrollProgress }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const prog = typeof scrollProgress === 'object' ? scrollProgress.get() : scrollProgress;
    if (mesh.current) {
      // Moves to center with the model
      const t = THREE.MathUtils.smoothstep(prog, 0, 0.35);
      mesh.current.position.x = THREE.MathUtils.lerp(2.5, 0, t);

      const pulse = Math.sin(clock.elapsedTime * 0.5) * 1.5;
      mesh.current.scale.setScalar(30 + pulse);
    }
  });

  return (
    <mesh position={[2.5, 0, -6]} scale={30} ref={mesh}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.15} toneMapped={false}>
        <canvasTexture attach="map" args={[generateRadialGradient()]} />
      </meshBasicMaterial>
    </mesh>
  );
}

// Utility to create a radial gradient texture for the backlight
function generateRadialGradient() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  return canvas;
}

function ExpertLighting({ scrollProgress }) {
  const spotlightRef = useRef();

  useFrame(() => {
    const prog = typeof scrollProgress === 'object' ? scrollProgress.get() : scrollProgress;
    if (spotlightRef.current) {
      // Centering the light as well
      const t = THREE.MathUtils.smoothstep(prog, 0, 0.35);
      spotlightRef.current.position.x = THREE.MathUtils.lerp(5, 0, t);
    }
  });

  return (
    <>
      <Environment preset="city" blur={0.8} />

      <SpotLight
        ref={spotlightRef}
        position={[5, 15, 12]}
        angle={0.4}
        penumbra={1.2}
        intensity={6}
        castShadow
        color="#ffffff"
        distance={50}
      />

      <spotLight position={[8, 3, -6]} intensity={18} color="#ec4899" angle={0.8} />
      <spotLight position={[-8, 3, -6]} intensity={18} color="#3b82f6" angle={0.8} />
      <pointLight position={[0, -2, 6]} intensity={2} color="#ffffff" />
    </>
  );
}

function SceneOrchestrator({ scrollProgress }) {
  const { camera } = useThree();
  const shadowRef = useRef();

  useFrame(() => {
    const prog = typeof scrollProgress === 'object' ? scrollProgress.get() : scrollProgress;
    // Camera is static to maintain focus
    camera.position.set(0, -4, 12);

    if (shadowRef.current) {
      // Sync shadow with model movement
      const t = THREE.MathUtils.smoothstep(prog, 0, 0.35);
      shadowRef.current.position.x = THREE.MathUtils.lerp(2.5, 0, t);
      shadowRef.current.position.y = THREE.MathUtils.lerp(-4.5, -8.0, t);
    }
  });

  return (
    <>
      <ExpertLighting scrollProgress={scrollProgress} />
      <BackdropGlow scrollProgress={scrollProgress} />
      <Avatar scrollProgress={scrollProgress} />

      <ContactShadows
        ref={shadowRef}
        position={[2.5, -4.5, 0]}
        opacity={0.8}
        scale={25}
        blur={4.5}
        far={10}
        color="#000000"
      />
    </>
  );
}

export default function About3DModel({ scrollProgress = 0 }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing relative bg-transparent">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <PerspectiveCamera makeDefault position={[0, -4, 12]} fov={30} />

        <Suspense fallback={null}>
          <SceneOrchestrator scrollProgress={scrollProgress} />

          <EffectComposer multisampling={0}>
            <Bloom luminanceThreshold={0.7} intensity={0.5} radius={0.3} />
            <Vignette eskil={false} offset={0.1} darkness={0.85} />
            <BrightnessContrast brightness={0} contrast={0.1} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}


// export default function About3DModel({ scrollProgress = 0 }) {
//   return (
//     <div className="w-full h-full cursor-grab active:cursor-grabbing relative bg-transparent">
//       <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, powerPreference: "high-performance" }}>
//         <PerspectiveCamera makeDefault position={[0, -4, 10]} fov={30} />

//         <Suspense fallback={null}>
//           <SceneOrchestrator scrollProgress={scrollProgress} />

//           <EffectComposer multisampling={4}>
//             <DepthOfField focusDistance={0.015} focalLength={0.15} bokehScale={1} height={480} />
//             <Bloom luminanceThreshold={0.7} intensity={0.5} radius={0.3} />
//             <Vignette eskil={false} offset={0.1} darkness={0.85} />
//             <BrightnessContrast brightness={0} contrast={0.1} />
//             <Noise opacity={0.01} />
//           </EffectComposer>
//         </Suspense>
//       </Canvas>
//     </div>
//   );
// }

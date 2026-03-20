import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  PerspectiveCamera,
  useTexture,
  useGLTF,
  ContactShadows,
  Environment,
  Text,
  MeshWobbleMaterial
} from '@react-three/drei';
import * as THREE from 'three';

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

import avatarModel from '../../images/optimized_avatar.glb';

// Preload the model for faster access
useGLTF.preload(avatarModel, false, false, (loader) => {
  loader.setMeshoptDecoder(MeshoptDecoder);
});

function Avatar() {
  const { scene } = useGLTF(avatarModel, false, false, (loader) => {
    loader.setMeshoptDecoder(MeshoptDecoder);
  });
  const group = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (group.current) {
      // Base rotation to face front
      const baseRotationY = Math.PI + Math.PI / 4 + 1;

      // Mouse movement based rotation
      const mouseRotationY = state.mouse.x * 0.3;
      const mouseRotationX = -state.mouse.y * 0.1;

      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        baseRotationY + mouseRotationY,
        0.1
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mouseRotationX,
        0.1
      );

      // Smooth Scale on Hover
      // const targetScale = hovered ? 6.2 : 5.5;
      // group.current.scale.setScalar(
      //   THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.1)
      // );
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={group}
        scale={5.5}
        position={[0, -4.5, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={scene} />
      </group>
    </Float>
  );
}

function Backdrop() {
  const mesh = useRef();

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 1.34;
    }
  });

  return (
    <mesh position={[0, 0, -10]} scale={[25, 25, 1]} ref={mesh}>
      <sphereGeometry args={[1, 64, 64]} />
      <MeshWobbleMaterial
        color="#ec4899"
        factor={0.4}
        speed={1}
        opacity={0.15}
        transparent
        wireframe
      />
    </mesh>
  );
}

export default function About3DModel() {
  return (
    <div className="w-full h-[800px] cursor-grab active:cursor-grabbing relative group/canvas">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, -4.7, 9]} fov={40} />

        {/* Lighting refined for premium look */}
        <ambientLight intensity={0.2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1.5}
          castShadow
          color="#1b1919ff"
        />
        <pointLight position={[-10, -5, 5]} intensity={0.5} color="#3b82f6" /> {/* Cool blue fill */}

        {/* Rim Lights for Halo Effect */}
        <pointLight position={[5, 1, -5]} intensity={2} color="#ec4899" />
        <pointLight position={[-5, 1, -5]} intensity={2} color="#ec4899" />

        <Suspense fallback={
          <Text color="white" fontSize={0.5} position={[0, 0, 0]}>
            Loading 3D Scene...
          </Text>
        }>
          <Environment preset="city" blur={0.8} />

          <Backdrop />
          <Avatar />

          <ContactShadows
            position={[0, -4.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={4.5}
            color="#ec4899"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

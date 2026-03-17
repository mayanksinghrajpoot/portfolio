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

import avatarModel from '../../images/dark_faceless_black_assassin.glb';

// A high-quality public developer avatar model
const AVATAR_URL = avatarModel;

function Avatar() {
  const { scene } = useGLTF(AVATAR_URL);
  const group = useRef();

  useFrame((state) => {
    if (group.current) {
      // Base rotation to face front (adding Math.PI to flip 180 degrees if it was facing back)
      const baseRotationY = Math.PI + Math.PI / 4 +1;
      
      // Mouse movement based rotation (additive)
      const mouseRotationY = state.mouse.x * (0.3);
      const mouseRotationX = -state.mouse.y * (0.1);

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
    }
  });

  return (
    <group ref={group} scale={5.5} position={[0, -4.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}


export default function About3DModel() {
  return (
    <div className="w-full h-[800px] cursor-grab active:cursor-grabbing relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, -4.7, 9]} fov={40} />

        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={
          <Text color="white" fontSize={0.5} position={[0, 0, 0]}>
            Loading 3D Scene...
          </Text>
        }>
          <Environment preset="city" />

          <Avatar />

          <ContactShadows
            position={[0, -4.5, 0]}
            opacity={0.7}
            scale={10}
            blur={2}
            far={4.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

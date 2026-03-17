import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Create a distortion effect based on hover state and time
  float wave = sin(uv.y * 10.0 + uTime * 2.0) * 0.05 * uHover;
  float wave2 = cos(uv.x * 10.0 + uTime * 2.0) * 0.05 * uHover;
  
  uv.x += wave;
  uv.y += wave2;
  
  // RGB Split effect
  float r = texture2D(uTexture, uv + vec2(0.01 * uHover, 0.0)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(0.01 * uHover, 0.0)).b;
  
  gl_FragColor = vec4(r, g, b, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uHover;

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Slight 3D bulging effect on hover
  pos.z += sin(pos.x * 3.14) * sin(pos.y * 3.14) * 0.2 * uHover;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

function DistortedImageMaterial({ imageSrc, isHovered }) {
  const meshRef = useRef();
  const texture = useLoader(THREE.TextureLoader, imageSrc);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 }
  }), [texture]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Smooth interpolation for hover state
      const targetHover = isHovered ? 1 : 0;
      meshRef.current.material.uniforms.uHover.value += (targetHover - meshRef.current.material.uniforms.uHover.value) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export default function ProjectImageDistortion({ imageSrc, isHovered }) {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60 transition-opacity duration-700">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: false, alpha: true }}>
        <DistortedImageMaterial imageSrc={imageSrc} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}

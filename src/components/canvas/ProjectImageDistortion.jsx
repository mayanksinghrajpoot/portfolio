import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform vec2 uTextureResolution;
varying vec2 vUv;

void main() {
  vec2 ratio = vec2(
    min((uResolution.x / uResolution.y) / (uTextureResolution.x / uTextureResolution.y), 1.0),
    min((uResolution.y / uResolution.x) / (uTextureResolution.y / uTextureResolution.x), 1.0)
  );

  vec2 uv = vec2(
    vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
    vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
  );
  
  // Remap mouse from [-1, 1] to [0, 1]
  vec2 mouseUv = uMouse * 0.5 + 0.5;
  
  // Create distance-based ripple effect from mouse position
  float dist = distance(uv, mouseUv);
  float ripple = sin((dist * 30.0) - (uTime * 8.0)) * 0.04 * exp(-dist * 5.0) * uHover;
  
  // Subtler global wave
  float wave = sin(uv.y * 10.0 + uTime * 2.5) * 0.05 * uHover;
  float wave2 = cos(uv.x * 10.0 + uTime * 2.0) * 0.05 * uHover;
  
  uv.x += wave + ripple;
  uv.y += wave2 + ripple;
  
  // RGB Split effect based on distance to mouse
  float splitIntensity = 0.015 * exp(-dist * 4.0) * uHover;
  float r = texture2D(uTexture, uv + vec2(splitIntensity, 0.0)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, uv - vec2(splitIntensity, 0.0)).b;
  
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
  pos.z += sin(pos.x * 3.14) * sin(pos.y * 3.14) * 0.2 * uHover;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

function DistortedImageMaterial({ imageSrc, isHovered }) {
  const meshRef = useRef();
  const { size } = useThree();
  const texture = useLoader(THREE.TextureLoader, imageSrc);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime: { value: 0 },
    uHover: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uTextureResolution: { value: new THREE.Vector2(texture.image.width, texture.image.height) }
  }), [texture, size]);

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uResolution.value.set(size.width, size.height);
    }
  }, [size]);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
      const targetHover = isHovered ? 1 : 0;
      meshRef.current.material.uniforms.uHover.value += (targetHover - meshRef.current.material.uniforms.uHover.value) * 0.1;
      if (isHovered) {
         meshRef.current.material.uniforms.uMouse.value.lerp(state.pointer, 0.1);
      }
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
    <div className="absolute inset-0 z-0 pointer-events-none opacity-80 transition-opacity duration-700">
      <Canvas 
        orthographic
        camera={{ left: -1, right: 1, top: 1, bottom: -1, near: 0.1, far: 10 }}
        dpr={[1, 2]} 
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <DistortedImageMaterial imageSrc={imageSrc} isHovered={isHovered} />
      </Canvas>
    </div>
  );
}


import React, { useRef } from 'react';
import { useFrame, extend, Object3DNode } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

const LightShaderMaterialImpl = shaderMaterial(
  { uTime: 0, uColor: new THREE.Color(0xe0e0e0) },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;

    // 2D Noise function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    // 2D Noise with time variation
    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
        vec2 st = vUv * 5.0; // Scale the noise
        st.x += uTime * 0.1; // Animate horizontally
        float n = noise(st);
        
        gl_FragColor = vec4(uColor * n, n * 0.5);
    }
  `
);

// Extend the material so it can be used as JSX element
extend({ LightShaderMaterial: LightShaderMaterialImpl });

// Declare types for TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      lightShaderMaterial: Object3DNode<any, typeof LightShaderMaterialImpl>;
    }
  }
}

interface LightPatternProps {
    color: string;
}

export const LightPattern: React.FC<LightPatternProps> = ({ color }) => {
  const materialRef = useRef<any>(null);
  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <planeGeometry args={[10, 10]} />
      <lightShaderMaterial ref={materialRef} uColor={color} transparent blending={THREE.AdditiveBlending} />
    </mesh>
  );
};

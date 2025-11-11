import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

export const AdvancedPlanet: React.FC = () => {
  const planetRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Create particle system around the planet
  const particles = useMemo(() => {
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const radius = 2 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Gradient colors from white to cyan
      const t = Math.random();
      colors[i * 3] = 0.5 + t * 0.5;     // R
      colors[i * 3 + 1] = 0.8 + t * 0.2; // G
      colors[i * 3 + 2] = 1;              // B
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.1;
      planetRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
    
    if (glowRef.current) {
      glowRef.current.rotation.y = -time * 0.15;
      glowRef.current.rotation.z = time * 0.05;
      // Pulsing effect
      const scale = 1.2 + Math.sin(time * 0.8) * 0.1;
      glowRef.current.scale.set(scale, scale, scale);
    }
    
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      particlesRef.current.rotation.x = time * 0.03;
    }
  });

  return (
    <group>
      {/* Background stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1}
      />
      
      {/* Particle field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.positions.length / 3}
            array={particles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particles.colors.length / 3}
            array={particles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main planet with distortion */}
      <Sphere ref={planetRef} args={[1.5, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#1a1a1a"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#0a0a0a"
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Outer glow layer 1 */}
      <Sphere ref={glowRef} args={[1.7, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#4a9eff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Inner glow layer 2 */}
      <Sphere args={[1.6, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Ring system */}
      <mesh rotation={[Math.PI / 3, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[2.3, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.3}
          emissive="#4a9eff"
          emissiveIntensity={0.5}
        />
      </mesh>

      <mesh rotation={[Math.PI / 3, 0, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.2}
          emissive="#8ab4ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Accent lights */}
      <pointLight position={[3, 2, 3]} color="#4a9eff" intensity={2} distance={10} />
      <pointLight position={[-3, -2, 3]} color="#ffffff" intensity={1.5} distance={10} />
      <spotLight
        position={[0, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#ffffff"
        castShadow
      />
    </group>
  );
};

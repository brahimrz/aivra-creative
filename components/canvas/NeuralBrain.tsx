import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const NeuralBrain: React.FC = () => {
  const brainRef = useRef<THREE.Group>(null);
  const neuronsRef = useRef<THREE.Points>(null);
  const connectionsRef = useRef<THREE.LineSegments>(null);
  
  // Create brain shape with particles
  const brainParticles = useMemo(() => {
    const particleCount = 800;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Create brain-like shape (ellipsoid)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.2 + Math.random() * 0.3;
      
      // Slightly flatten for brain shape
      const x = radius * Math.sin(phi) * Math.cos(theta) * 0.8;
      const y = radius * Math.sin(phi) * Math.sin(theta) * 0.9;
      const z = radius * Math.cos(phi) * 1.1;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      
      // White to cyan gradient
      colors[i * 3] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
      colors[i * 3 + 2] = 1.0;
    }
    
    return { positions, colors };
  }, []);
  
  // Create neural connections
  const neuralConnections = useMemo(() => {
    const connectionCount = 200;
    const positions = new Float32Array(connectionCount * 6);
    const colors = new Float32Array(connectionCount * 6);
    
    for (let i = 0; i < connectionCount; i++) {
      // Random start point
      const startIdx = Math.floor(Math.random() * (brainParticles.positions.length / 3)) * 3;
      const endIdx = Math.floor(Math.random() * (brainParticles.positions.length / 3)) * 3;
      
      // Start point
      positions[i * 6] = brainParticles.positions[startIdx];
      positions[i * 6 + 1] = brainParticles.positions[startIdx + 1];
      positions[i * 6 + 2] = brainParticles.positions[startIdx + 2];
      
      // End point
      positions[i * 6 + 3] = brainParticles.positions[endIdx];
      positions[i * 6 + 4] = brainParticles.positions[endIdx + 1];
      positions[i * 6 + 5] = brainParticles.positions[endIdx + 2];
      
      // Color for connections (cyan with varying opacity)
      const alpha = 0.3 + Math.random() * 0.4;
      for (let j = 0; j < 6; j += 3) {
        colors[i * 6 + j] = 0.5 * alpha;
        colors[i * 6 + j + 1] = 0.8 * alpha;
        colors[i * 6 + j + 2] = 1.0 * alpha;
      }
    }
    
    return { positions, colors };
  }, [brainParticles]);
  
  // Create pulsing neural signals
  const neuralSignals = useMemo(() => {
    const signalCount = 50;
    const positions = new Float32Array(signalCount * 3);
    const colors = new Float32Array(signalCount * 3);
    const sizes = new Float32Array(signalCount);
    
    for (let i = 0; i < signalCount; i++) {
      const idx = Math.floor(Math.random() * (brainParticles.positions.length / 3)) * 3;
      
      positions[i * 3] = brainParticles.positions[idx];
      positions[i * 3 + 1] = brainParticles.positions[idx + 1];
      positions[i * 3 + 2] = brainParticles.positions[idx + 2];
      
      // Bright white-cyan signals
      colors[i * 3] = 0.8 + Math.random() * 0.2;
      colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
      colors[i * 3 + 2] = 1.0;
      
      sizes[i] = 0.05 + Math.random() * 0.1;
    }
    
    return { positions, colors, sizes };
  }, [brainParticles]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (brainRef.current) {
      // Gentle rotation
      brainRef.current.rotation.y = time * 0.15;
      brainRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
    
    if (neuronsRef.current) {
      const positions = neuronsRef.current.geometry.attributes.position.array as Float32Array;
      
      // Pulsing effect on neurons
      for (let i = 0; i < positions.length; i += 3) {
        const offset = i * 0.01;
        const pulse = Math.sin(time * 2 + offset) * 0.02;
        const originalX = brainParticles.positions[i];
        const originalY = brainParticles.positions[i + 1];
        const originalZ = brainParticles.positions[i + 2];
        
        const scale = 1 + pulse;
        positions[i] = originalX * scale;
        positions[i + 1] = originalY * scale;
        positions[i + 2] = originalZ * scale;
      }
      
      neuronsRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    if (connectionsRef.current) {
      // Fade connections in and out
      const material = connectionsRef.current.material as THREE.LineBasicMaterial;
      material.opacity = 0.2 + Math.sin(time * 0.5) * 0.15;
    }
  });

  return (
    <group ref={brainRef}>
      {/* Main brain neurons */}
      <points ref={neuronsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={brainParticles.positions.length / 3}
            array={brainParticles.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={brainParticles.colors.length / 3}
            array={brainParticles.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Neural connections */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={neuralConnections.positions.length / 3}
            array={neuralConnections.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={neuralConnections.colors.length / 3}
            array={neuralConnections.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Pulsing neural signals */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={neuralSignals.positions.length / 3}
            array={neuralSignals.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={neuralSignals.colors.length / 3}
            array={neuralSignals.colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Ambient glow */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial
          color="#4a9eff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Lighting */}
      <pointLight position={[2, 2, 2]} color="#ffffff" intensity={0.5} />
      <pointLight position={[-2, -2, 2]} color="#4a9eff" intensity={0.3} />
    </group>
  );
};

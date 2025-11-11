
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const LERP_FACTOR = 0.05;

export function NeuralStructure() {
  const group = useRef<THREE.Group>(null!);
  const particles = useRef<THREE.Points>(null!);
  const { viewport, mouse } = useThree();

  const [points, lines] = useMemo(() => {
    const numPoints = 200;
    const radius = 2;
    const vertices = Array.from({ length: numPoints }, () => 
      (new THREE.Vector3()).setFromSphericalCoords(
        radius,
        Math.acos(2 * Math.random() - 1),
        2 * Math.PI * Math.random()
      )
    );
    
    const lineIndices = [];
    for (let i = 0; i < numPoints; i++) {
      for (let j = i + 1; j < numPoints; j++) {
        const dist = vertices[i].distanceTo(vertices[j]);
        if (dist < 1.0) {
          lineIndices.push(i, j);
        }
      }
    }
    
    const pointsGeometry = new THREE.BufferGeometry().setFromPoints(vertices);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', pointsGeometry.getAttribute('position'));
    lineGeometry.setIndex(lineIndices);

    return [pointsGeometry, lineGeometry];
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
        group.current.rotation.y += delta * 0.1;
        
        // Mouse tilt effect with capped range and smooth interpolation
        const targetX = (mouse.y * viewport.height / 2) * 0.1;
        const targetY = (mouse.x * viewport.width / 2) * 0.1;

        // Cap rotation to ±10 degrees (approx 0.17 radians)
        const cappedTargetX = THREE.MathUtils.clamp(targetX, -0.17, 0.17);
        const cappedTargetY = THREE.MathUtils.clamp(targetY, -0.17, 0.17);

        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, cappedTargetX, LERP_FACTOR);
        group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, group.current.rotation.y + delta * 0.1 + cappedTargetY, LERP_FACTOR);
    }
  });

  return (
    <group ref={group}>
      <points ref={particles} geometry={points}>
        <pointsMaterial size={0.02} color="#ffffff" />
      </points>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color="#9e9e9e" transparent opacity={0.4} />
      </lineSegments>
    </group>
  );
}

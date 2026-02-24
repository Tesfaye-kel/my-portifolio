import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function Particles({ count = 5000 }) {
  const ref = useRef();
  
  // Generate random positions for particles
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread particles in a sphere-like pattern
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1 + Math.random() * 2;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      // Slow rotation
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#64ffda"
          size={0.015}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.2;
      meshRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, -1, -2]}>
      <icosahedronGeometry args={[0.5, 0]} />
      <meshBasicMaterial 
        color="#64ffda" 
        wireframe 
        transparent 
        opacity={0.3} 
      />
    </mesh>
  );
}

function FloatingShape2() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.z = time * 0.1;
      meshRef.current.position.y = -1 + Math.sin(time * 0.5) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2.5, -1, -1.5]}>
      <octahedronGeometry args={[0.4, 0]} />
      <meshBasicMaterial 
        color="#64ffda" 
        wireframe 
        transparent 
        opacity={0.2} 
      />
    </mesh>
  );
}

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 2], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <Particles count={3000} />
        <FloatingShapes />
        <FloatingShape2 />
      </Canvas>
    </div>
  );
};

export default ThreeBackground;

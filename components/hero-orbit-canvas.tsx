import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

// Brand accents from index.css — primary blue + AI-signal purple.
const COLOR_PRIMARY = new THREE.Color('#3b82f6');
const COLOR_ACCENT = new THREE.Color('#8b5cf6');

const PARTICLE_COUNT = 900;
const RADIUS = 2.2;

/**
 * Builds a static Fibonacci-sphere point cloud: evenly distributed points on a
 * sphere surface, each tinted on a primary→accent gradient by latitude. Memoised
 * geometry so it is generated once, not per frame.
 */
function useSphereGeometry(): THREE.BufferGeometry {
  return useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const golden = Math.PI * (3 - Math.sqrt(5)); // golden angle
    const tint = new THREE.Color();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2; // 1 → -1
      const ring = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const x = Math.cos(theta) * ring;
      const z = Math.sin(theta) * ring;

      positions[i * 3] = x * RADIUS;
      positions[i * 3 + 1] = y * RADIUS;
      positions[i * 3 + 2] = z * RADIUS;

      tint.copy(COLOR_PRIMARY).lerp(COLOR_ACCENT, (y + 1) / 2);
      colors[i * 3] = tint.r;
      colors[i * 3 + 1] = tint.g;
      colors[i * 3 + 2] = tint.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);
}

/** Slowly auto-rotating particle sphere with a gentle pointer-driven parallax tilt. */
const ParticleSphere: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const geometry = useSphereGeometry();

  useFrame((state, delta) => {
    const points = ref.current;
    if (!points) return;
    points.rotation.y += delta * 0.12;
    // Ease the group toward a small tilt that follows the pointer.
    const targetX = state.pointer.y * 0.2;
    const targetZ = state.pointer.x * 0.1;
    points.rotation.x += (targetX - points.rotation.x) * 0.04;
    points.rotation.z += (targetZ - points.rotation.z) * 0.04;
  });

  const pointsProps: ThreeElements['points'] = { ref };

  return (
    <points {...pointsProps} geometry={geometry}>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

/**
 * Decorative WebGL backdrop for the Hero portrait. Rendered behind the photo,
 * lazy-loaded as its own chunk, and only mounted by the Hero when motion is
 * allowed and the viewport is large enough to justify the cost.
 */
const HeroOrbitCanvas: React.FC = () => (
  <Canvas
    aria-hidden="true"
    className="pointer-events-none"
    camera={{ position: [0, 0, 6], fov: 45 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
    frameloop="always"
  >
    <ParticleSphere />
  </Canvas>
);

export default HeroOrbitCanvas;

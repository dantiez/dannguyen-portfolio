import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

// Brand accents from index.css — electric blue → indigo secondary.
const COLOR_PRIMARY = new THREE.Color('#3b82f6');
const COLOR_ACCENT = new THREE.Color('#818cf8');

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

/** Max automatic re-creations after context loss before giving up silently. */
const MAX_RECOVERIES = 2;
const RECOVERY_DELAY_MS = 1500;

/**
 * Decorative WebGL backdrop for the Hero portrait. Rendered behind the photo,
 * lazy-loaded as its own chunk, and only mounted by the Hero when motion is
 * allowed and the viewport is large enough to justify the cost.
 *
 * WebGL context loss (GPU reset, too many contexts after dev HMR reloads,
 * laptop sleep) makes Chrome paint a white "sad face" placeholder. On
 * `webglcontextlost` we hide the canvas at once, then remount it with a fresh
 * context after a short delay. After MAX_RECOVERIES we leave it hidden — the
 * portrait and halo still look fine without the particles.
 */
const HeroOrbitCanvas: React.FC = () => {
  const [lost, setLost] = useState(false);
  const [generation, setGeneration] = useState(0);
  const recoveries = useRef(0);
  const timer = useRef<number | undefined>(undefined);

  const onLost = useCallback((event: Event) => {
    event.preventDefault();
    setLost(true);
    if (recoveries.current >= MAX_RECOVERIES) return;
    recoveries.current += 1;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setGeneration((g) => g + 1); // new <Canvas> key → new renderer + context
      setLost(false);
    }, RECOVERY_DELAY_MS);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <div
      className={`h-full w-full transition-opacity duration-500 ${lost ? 'invisible opacity-0' : 'opacity-100'}`}
    >
      <Canvas
        key={generation}
        aria-hidden="true"
        className="pointer-events-none"
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        frameloop={lost ? 'never' : 'always'}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // keep the canvas fully transparent
          gl.domElement.addEventListener('webglcontextlost', onLost, false);
        }}
      >
        <ParticleSphere />
      </Canvas>
    </div>
  );
};

export default HeroOrbitCanvas;

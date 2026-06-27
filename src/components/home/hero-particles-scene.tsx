"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Deep brand colors — clearly visible on cream; the scrim keeps text legible.
const SLATE = new THREE.Color("#3f4855");
const TEAL = new THREE.Color("#1c574f");
const PLUM = new THREE.Color("#522d57");

const RADIUS = 3.6;

function useConstellation(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const jitter = 0.92 + Math.random() * 0.16;

      positions[i * 3] = Math.cos(theta) * r * RADIUS * jitter;
      positions[i * 3 + 1] = y * RADIUS * jitter;
      positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS * jitter;

      const t = (y + 1) / 2; // 0 bottom -> 1 top
      if (t < 0.5) c.copy(PLUM).lerp(TEAL, t * 2);
      else c.copy(TEAL).lerp(SLATE, (t - 0.5) * 2);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);
}

function Constellation({ lite, ...props }: { lite: boolean } & ThreeElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { positions, colors } = useConstellation(lite ? 1400 : 3200);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.05;
    const targetX = state.pointer.y * 0.3;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.rotation.z = state.pointer.x * 0.12;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
  });

  return (
    <group ref={group} {...props}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <PointMaterial
          transparent
          vertexColors
          size={lite ? 0.052 : 0.042}
          sizeAttenuation
          depthWrite={false}
          opacity={0.9}
        />
      </points>
    </group>
  );
}

export default function HeroParticlesScene({ lite = false }: { lite?: boolean }) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: lite ? "default" : "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Constellation lite={lite} />
    </Canvas>
  );
}

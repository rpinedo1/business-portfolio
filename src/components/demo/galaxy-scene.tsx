"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const CORE = new THREE.Color("#e3c489"); // warm gold core
const MID = new THREE.Color("#8fd6cf"); // teal
const EDGE = new THREE.Color("#5a2f5f"); // plum rim

const RADIUS = 5;
const BRANCHES = 4;
const SPIN = 0.9;

function useGalaxy(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const r = Math.random() * RADIUS;
      const branchAngle = ((i % BRANCHES) / BRANCHES) * Math.PI * 2;
      const spinAngle = r * SPIN;

      const scatter = () =>
        Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.5 * (r / RADIUS + 0.1);

      const x = Math.cos(branchAngle + spinAngle) * r + scatter() * RADIUS * 0.25;
      const z = Math.sin(branchAngle + spinAngle) * r + scatter() * RADIUS * 0.25;
      const y = scatter() * 0.6;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const t = r / RADIUS;
      if (t < 0.5) c.copy(CORE).lerp(MID, t * 2);
      else c.copy(MID).lerp(EDGE, (t - 0.5) * 2);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);
}

function Galaxy({ lite }: { lite: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useGalaxy(lite ? 2800 : 7000);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.12;
    const tiltTarget = -0.55 + state.pointer.y * 0.25;
    ref.current.rotation.x += (tiltTarget - ref.current.rotation.x) * 0.04;
    ref.current.rotation.z = state.pointer.x * 0.1;
  });

  return (
    <points ref={ref} rotation={[-0.55, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={lite ? 0.05 : 0.038}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.95}
      />
    </points>
  );
}

export default function GalaxyScene({ lite = false }: { lite?: boolean }) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 1.6, 7], fov: 55 }}
      gl={{ antialias: !lite, alpha: true, powerPreference: lite ? "default" : "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Galaxy lite={lite} />
    </Canvas>
  );
}

"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, type ThreeElements } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Brand palette, reused from the CSS tokens.
const TEAL = new THREE.Color("#05605b");
const PLUM = new THREE.Color("#5a2f5f");
const GOLD = new THREE.Color("#b08542");

const RADIUS = 3.6;

/** Points distributed on a Fibonacci sphere, colored teal -> plum -> gold by latitude. */
function useConstellation(count: number) {
  return useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const c = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // 1 -> -1
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const jitter = 0.92 + Math.random() * 0.16;

      positions[i * 3] = Math.cos(theta) * r * RADIUS * jitter;
      positions[i * 3 + 1] = y * RADIUS * jitter;
      positions[i * 3 + 2] = Math.sin(theta) * r * RADIUS * jitter;

      const t = (y + 1) / 2; // 0 bottom -> 1 top
      if (t < 0.5) c.copy(PLUM).lerp(TEAL, t * 2);
      else c.copy(TEAL).lerp(GOLD, (t - 0.5) * 2 * 0.85);

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);
}

function Constellation({ lite, ...props }: { lite: boolean } & ThreeElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { positions, colors } = useConstellation(lite ? 1400 : 3600);

  useFrame((state, delta) => {
    if (!group.current) return;
    // Gentle constant drift...
    group.current.rotation.y += delta * 0.05;
    // ...plus parallax toward the pointer (touch updates this too).
    const targetX = state.pointer.y * 0.35;
    const targetY = group.current.rotation.y + state.pointer.x * 0.35;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
    // Subtle breathing scale.
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.015;
    group.current.scale.setScalar(s);
    void targetY;
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
          size={lite ? 0.06 : 0.045}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.95}
        />
      </points>
    </group>
  );
}

export default function WebglHeroScene({ lite = false }: { lite?: boolean }) {
  return (
    <Canvas
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{
        antialias: !lite,
        alpha: true,
        powerPreference: lite ? "default" : "high-performance",
      }}
      style={{ pointerEvents: "none" }}
    >
      <Constellation lite={lite} />
    </Canvas>
  );
}

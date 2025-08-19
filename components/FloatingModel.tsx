"use client";

import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

function Seed({
  started,
  onLand,
}: {
  started: boolean;
  onLand?: () => void;
}) {
  const { scene } = useGLTF("/models/seed.glb");
  const ref = useRef<THREE.Group>(null);

  const startTimeRef = useRef<number | null>(null);
  const landedRef = useRef(false);

  // Tune these if needed
  const Y_START = 1.3;
  const Y_END = -2.3;
  const DURATION = 3.2;

  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const slowPhase = useMemo(() => Math.random() * Math.PI * 2, []);

  useMemo(() => {
    scene.traverse((o: any) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    scene.scale.set(0.003, 0.003, 0.003);
  }, [scene]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    if (!started) {
      ref.current.position.set(0, Y_START, 0);
      ref.current.rotation.set(0, 0, 0);
      return;
    }

    if (startTimeRef.current === null) startTimeRef.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime - startTimeRef.current;

    const p = Math.min(1, t / DURATION);
    const easeIn = p * p;

    const amp = 0.18 * (0.6 + 0.4 * Math.sin(t * 0.3 + phase));
    const swaySlow = Math.sin(t * 0.35 + slowPhase) * amp;
    const swayFast = Math.sin(t * 1.1 + phase) * amp * 0.35;
    const windX = (swaySlow + swayFast) * (0.85 + 0.15 * easeIn);
    const windZ = Math.cos(t * 0.45 + phase) * 0.06 * (0.6 + 0.4 * easeIn);

    const y = THREE.MathUtils.lerp(Y_START, Y_END, easeIn);
    ref.current.position.set(windX, y, windZ);

    const spinEase = 1 - Math.pow(1 - p, 3);
    ref.current.rotation.y += delta * 0.7 * spinEase;
    ref.current.rotation.z = Math.sin(t * 0.9 + phase) * 0.22 * spinEase;

    if (p === 1 && !landedRef.current) {
      landedRef.current = true;
      onLand?.();
    }
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

export default function FloatingModel({
  onSeedLand,
}: {
  onSeedLand?: () => void;
}) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const start = () => setStarted(true);
    if (window.scrollY > 10) start(); // start immediately if already scrolled
    const onScroll = () => { if (window.scrollY > 10) start(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", start, { passive: true });
    window.addEventListener("touchmove", start, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", start);
      window.removeEventListener("touchmove", start);
    };
  }, []);

  return (
    <Canvas className="pointer-events-none" camera={{ position: [0, 0, 3], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 3, 2]} intensity={1} />
      <Suspense fallback={null}>
        <Seed started={started} onLand={onSeedLand} />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/seed.glb");

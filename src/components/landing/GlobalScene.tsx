"use client";

import { useRef, useMemo, useCallback, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

// ── Camera Scroll Controller ──
function ScrollCamera() {
  useFrame((state) => {
    // Map window scroll down to camera moving down Y-axis
    const scrollY = window.scrollY;
    // Tweak to coordinate descent speed (e.g. 0.008 units per pixel)
    const targetY = -(scrollY * 0.008); 
    state.camera.position.y += (targetY - state.camera.position.y) * 0.08;
  });
  return null;
}

// ── Particle Network Data Sea ──
function ParticleNetwork({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);

  const [particles] = useState(() => {
    const arr = [];
    const spreadX = Math.max(viewport.width, 20);
    // Spread massively down the Y-axis to cover the whole scrollable page
    const spreadY = 80; 
    for (let i = 0; i < count; i++) {
      arr.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * spreadX * 2,
          (Math.random() * -spreadY) + 5, // Y ranges from +5 down to -75
          (Math.random() - 0.5) * 15 - 5
        ),
        speed: 0.05 + Math.random() * 0.15,
        offset: Math.random() * Math.PI * 2,
        scale: 0.01 + Math.random() * 0.03,
      });
    }
    return arr;
  });

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const x = p.position.x + Math.sin(t * p.speed + p.offset) * 0.5;
      const y = p.position.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.5;
      const z = p.position.z + Math.sin(t * p.speed * 0.5) * 0.2;
      dummy.position.set(x, y, z);
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#00F0FF" transparent opacity={0.4} />
    </instancedMesh>
  );
}

// ── Agent Point Cloud (Lobster) ──
function AgentPointCloud({ 
  imgUrl, 
  position = [0, 0, 0], 
  rotationSpeed = 0.4, 
  scale = 1,
  color = "#00F0FF"
}: { 
  imgUrl: string;
  position?: [number, number, number];
  rotationSpeed?: number;
  scale?: number;
  color?: string;
}) {
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = imgUrl;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const w = img.width;
      const h = img.height;
      if (w === 0 || h === 0) return;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, w, h).data;

      const validPixels = [];
      const step = 3;
      for (let y = 0; y < h; y += step) {
        for (let x = 0; x < w; x += step) {
          const index = (y * w + x) * 4;
          const alpha = data[index + 3];
          if (alpha > 50) {
            const normX = (x / w) - 0.5;
            const normY = -(y / h) + 0.5;
            validPixels.push({ x: normX, y: normY });
          }
        }
      }

      const pts = new Float32Array(validPixels.length * 3);
      validPixels.forEach((p, i) => {
        pts[i * 3] = p.x * 7.5 * scale;
        pts[i * 3 + 1] = p.y * 7.5 * scale;
        pts[i * 3 + 2] = (Math.random() - 0.5) * 1.5 * scale;
      });
      setPositions(pts);
    };
  }, [imgUrl, scale]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const t = clock.getElapsedTime();
      pointsRef.current.rotation.y = Math.sin(t * rotationSpeed) * 0.25;
      pointsRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.15;
    }
  });

  if (!positions) return null;

  return (
    <points ref={pointsRef} position={[position[0], position[1], position[2]]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.025 * scale} color={color} transparent opacity={0.8} sizeAttenuation={true} />
    </points>
  );
}

// ── Floating Geometric Shapes ──
function FloatingGeo({
  position, size, speed, rotationSpeed, distort, color,
}: {
  position: [number, number, number]; size: number; speed: number;
  rotationSpeed: number; distort: number; color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * rotationSpeed * 0.3;
    meshRef.current.rotation.y = t * rotationSpeed * 0.5;
  });
  return (
    <Float speed={speed} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[size, 0]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.7}
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

// ── Scene Composition ──
function Scene() {
  return (
    <>
      <color attach="background" args={["#0c0f14"]} />
      <fog attach="fog" args={["#0c0f14", 5, 30]} />
      <ambientLight intensity={0.15} />

      <ScrollCamera />

      {/* Main Hero Lobster */}
      <AgentPointCloud imgUrl="/openclaw.png" position={[0, 0, 0]} color="#00F0FF" />
      
      {/* Deep Sea Lobsters Swimming Below */}
      <AgentPointCloud imgUrl="/openclaw.png" position={[-6, -15, -8]} scale={0.4} rotationSpeed={0.6} color="#7B61FF" />
      <AgentPointCloud imgUrl="/openclaw.png" position={[8, -30, -5]} scale={0.5} rotationSpeed={0.3} color="#F96706" />
      <AgentPointCloud imgUrl="/openclaw.png" position={[-5, -45, -12]} scale={0.6} rotationSpeed={0.5} color="#00F0FF" />

      {/* Vast Field of Data Particles spanning deep down */}
      <ParticleNetwork count={500} />

      {/* Geometric Ornaments scattered around */}
      <FloatingGeo position={[-5, 2, -3]} size={0.4} speed={1.5} rotationSpeed={0.8} distort={0.3} color="#00F0FF" />
      <FloatingGeo position={[5, -1.5, -2]} size={0.3} speed={2} rotationSpeed={1.2} distort={0.2} color="#7B61FF" />
      <FloatingGeo position={[-8, -12, -6]} size={0.5} speed={1.2} rotationSpeed={0.5} distort={0.4} color="#F96706" />
      <FloatingGeo position={[6, -22, -4]} size={0.3} speed={2.5} rotationSpeed={1.5} distort={0.2} color="#00FF88" />
      <FloatingGeo position={[-4, -38, -5]} size={0.45} speed={1.8} rotationSpeed={0.9} distort={0.3} color="#7B61FF" />

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.5} luminanceSmoothing={0.9} mipmapBlur />
        <Vignette eskil={false} offset={0.1} darkness={0.6} />
      </EffectComposer>
    </>
  );
}

export default function GlobalScene() {
  return (
    <div className="fixed inset-0 w-full h-full -z-50 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

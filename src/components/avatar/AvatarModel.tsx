'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type Emotion = 'neutral' | 'skeptical' | 'frustrated' | 'happy';

interface Props {
  emotion?: Emotion;
  isSpeaking?: boolean;
}

// ─── Emotion pose targets ──────────────────────────────────────────
interface Pose {
  headTilt: number;
  headY: number;
  headRotX: number;
  leftBrowY: number;
  leftBrowRot: number;
  rightBrowY: number;
  rightBrowRot: number;
  eyeScaleY: number;
  mouthWidth: number;
  mouthOpen: number;
  color: string;
  emissive: string;
}

const POSES: Record<string, Pose> = {
  neutral: {
    headTilt: 0,
    headY: 0,
    headRotX: 0,
    leftBrowY: 0,
    leftBrowRot: 0,
    rightBrowY: 0,
    rightBrowRot: 0,
    eyeScaleY: 1,
    mouthWidth: 0.35,
    mouthOpen: 0.02,
    color: '#d4c4b0',
    emissive: '#222233',
  },
  skeptical: {
    headTilt: 0.12,
    headY: 0,
    headRotX: -0.08,
    leftBrowY: 0.35,
    leftBrowRot: -0.15,
    rightBrowY: -0.1,
    rightBrowRot: 0.12,
    eyeScaleY: 0.55,
    mouthWidth: 0.25,
    mouthOpen: 0.01,
    color: '#c8b8a8',
    emissive: '#332233',
  },
  frustrated: {
    headTilt: -0.08,
    headY: -0.08,
    headRotX: 0.05,
    leftBrowY: -0.25,
    leftBrowRot: 0.2,
    rightBrowY: -0.25,
    rightBrowRot: -0.2,
    eyeScaleY: 0.65,
    mouthWidth: 0.45,
    mouthOpen: 0.04,
    color: '#b89890',
    emissive: '#442222',
  },
  happy: {
    headTilt: 0.05,
    headY: 0.08,
    headRotX: 0.03,
    leftBrowY: 0.18,
    leftBrowRot: -0.06,
    rightBrowY: 0.18,
    rightBrowRot: 0.06,
    eyeScaleY: 1.15,
    mouthWidth: 0.65,
    mouthOpen: 0.25,
    color: '#d8c8a0',
    emissive: '#224422',
  },
};

export default function AvatarModel({ emotion = 'neutral', isSpeaking = false }: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const headRef = useRef<THREE.Mesh>(null!);
  const leftBrowRef = useRef<THREE.Mesh>(null!);
  const rightBrowRef = useRef<THREE.Mesh>(null!);
  const leftEyeRef = useRef<THREE.Group>(null!);
  const rightEyeRef = useRef<THREE.Group>(null!);
  const mouthRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null!);

  // Smooth current values
  const current = useRef({ ...POSES.neutral });
  const target = useRef({ ...POSES.neutral });
  const speakingTime = useRef(0);

  // Update target when emotion changes
  useEffect(() => {
    target.current = { ...(POSES[emotion] || POSES.neutral) };
  }, [emotion]);

  // ─── Mouth shape ─────────────────────────────────────────────────
  const mouthShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.5, 0);
    shape.quadraticCurveTo(0, 0.3, 0.5, 0);
    shape.quadraticCurveTo(0, -0.1, -0.5, 0);
    return shape;
  }, []);

  // ─── Animation loop ──────────────────────────────────────────────
  useFrame((_, delta) => {
    const s = Math.min(1, delta * 6); // smooth factor
    const c = current.current;
    const t = target.current;

    // Lerp all values
    c.headTilt += (t.headTilt - c.headTilt) * s;
    c.headY += (t.headY - c.headY) * s;
    c.headRotX += (t.headRotX - c.headRotX) * s;
    c.leftBrowY += (t.leftBrowY - c.leftBrowY) * s;
    c.leftBrowRot += (t.leftBrowRot - c.leftBrowRot) * s;
    c.rightBrowY += (t.rightBrowY - c.rightBrowY) * s;
    c.rightBrowRot += (t.rightBrowRot - c.rightBrowRot) * s;
    c.eyeScaleY += (t.eyeScaleY - c.eyeScaleY) * s;
    c.mouthWidth += (t.mouthWidth - c.mouthWidth) * s;
    c.mouthOpen += (t.mouthOpen - c.mouthOpen) * s;

    // Head rotation + idle bob
    if (groupRef.current) {
      const bob = Math.sin(Date.now() / 1000) * 0.02;
      groupRef.current.position.y = c.headY + bob;
      groupRef.current.rotation.z = c.headTilt;
      groupRef.current.rotation.x = c.headRotX;
    }

    // Eyebrows
    if (leftBrowRef.current) {
      leftBrowRef.current.position.y = c.leftBrowY;
      leftBrowRef.current.rotation.z = c.leftBrowRot;
    }
    if (rightBrowRef.current) {
      rightBrowRef.current.position.y = c.rightBrowY;
      rightBrowRef.current.rotation.z = c.rightBrowRot;
    }

    // Eye squint
    if (leftEyeRef.current) leftEyeRef.current.scale.y = c.eyeScaleY;
    if (rightEyeRef.current) rightEyeRef.current.scale.y = c.eyeScaleY;

    // Mouth
    if (mouthRef.current) {
      const breathCycle = isSpeaking
        ? Math.sin(Date.now() / 80) * 0.15 + 0.15 // speaking vibration
        : 0;
      const openAmount = c.mouthOpen + breathCycle;
      const width = c.mouthWidth;

      // Scale mouth mesh
      mouthRef.current.scale.x = width / 0.35;
      mouthRef.current.scale.y = openAmount / 0.02 + 0.5;
      mouthRef.current.position.y = -1.4 - openAmount * 0.15;
    }

    // Color lerp
    if (matRef.current) {
      const targetColor = new THREE.Color(t.color);
      const currentColor = new THREE.Color(c.color);
      // If color changed, lerp
      if (!currentColor.equals(targetColor)) {
        currentColor.lerp(targetColor, s);
        matRef.current.color.copy(currentColor);
        c.color = '#' + currentColor.getHexString();
      }
    }

    // Speaking idle animation - subtle nodding
    if (isSpeaking) {
      speakingTime.current += delta;
      if (headRef.current) {
        headRef.current.position.y = Math.sin(speakingTime.current * 8) * 0.03;
      }
    } else {
      speakingTime.current = 0;
    }
  });

  return (
    <group ref={groupRef}>
      {/* ─── Head ───────────────────────────────────────── */}
      <mesh ref={headRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.8, 4]} />
        <meshPhysicalMaterial
          ref={matRef}
          color="#d4c4b0"
          roughness={0.5}
          metalness={0.05}
          clearcoat={0.15}
          clearcoatRoughness={0.4}
          emissive="#222233"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* ─── Neck ───────────────────────────────────────── */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.7, 0.9, 0.8, 12]} />
        <meshPhysicalMaterial color="#c0b0a0" roughness={0.7} metalness={0} />
      </mesh>

      {/* ─── Shoulders ──────────────────────────────────── */}
      <mesh position={[0, -2.8, 0]}>
        <sphereGeometry args={[1.5, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial color="#1a1a2e" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* ─── Left Eye ───────────────────────────────────── */}
      <group ref={leftEyeRef} position={[-0.6, 0.4, 1.6]}>
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.15]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshPhysicalMaterial color="#1a1a2e" roughness={0.9} />
        </mesh>
        <mesh position={[0.04, 0.04, 0.18]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.5} />
        </mesh>
      </group>

      {/* ─── Right Eye ──────────────────────────────────── */}
      <group ref={rightEyeRef} position={[0.6, 0.4, 1.6]}>
        <mesh>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0, 0.15]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshPhysicalMaterial color="#1a1a2e" roughness={0.9} />
        </mesh>
        <mesh position={[-0.04, 0.04, 0.18]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshPhysicalMaterial color="#ffffff" roughness={0.5} />
        </mesh>
      </group>

      {/* ─── Left Eyebrow ───────────────────────────────── */}
      <mesh ref={leftBrowRef} position={[-0.6, 0.85, 1.6]}>
        <boxGeometry args={[0.5, 0.06, 0.1]} />
        <meshPhysicalMaterial color="#3a2a1a" roughness={0.8} />
      </mesh>

      {/* ─── Right Eyebrow ──────────────────────────────── */}
      <mesh ref={rightBrowRef} position={[0.6, 0.85, 1.6]}>
        <boxGeometry args={[0.5, 0.06, 0.1]} />
        <meshPhysicalMaterial color="#3a2a1a" roughness={0.8} />
      </mesh>

      {/* ─── Mouth ──────────────────────────────────────── */}
      <mesh ref={mouthRef} position={[0, -1.4, 1.65]} rotation={[0, 0, 0]}>
        <shapeGeometry args={[mouthShape]} />
        <meshPhysicalMaterial color="#5a3a2a" roughness={0.6} metalness={0} />
      </mesh>
    </group>
  );
}

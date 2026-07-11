'use client';

import { Canvas } from '@react-three/fiber';
import { ContactShadows, Float } from '@react-three/drei';
import AvatarModel, { type Emotion } from './AvatarModel';

interface Props {
  emotion?: Emotion;
  isSpeaking?: boolean;
}

export default function AvatarScene({ emotion = 'neutral', isSpeaking = false }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0.3, 5.5], fov: 40, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%', borderRadius: '16px' }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // transparent
      }}
    >
      {/* ─── Lighting ─────────────────────────────────────── */}
      <ambientLight intensity={0.4} color="#8899cc" />
      <directionalLight
        position={[4, 5, 4]}
        intensity={1.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#6688ff" />
      <directionalLight position={[0, -3, 2]} intensity={0.3} color="#ff8866" />

      {/* ─── Avatar ───────────────────────────────────────── */}
      <Float speed={1.2} rotationIntensity={0.04} floatIntensity={0.08}>
        <AvatarModel emotion={emotion} isSpeaking={isSpeaking} />
      </Float>

      {/* ─── Shadow ───────────────────────────────────────── */}
      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.4}
        scale={6}
        blur={2.5}
        far={5}
        color="#000000"
      />
    </Canvas>
  );
}

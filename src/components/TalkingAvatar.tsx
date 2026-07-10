'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface Props {
  audioBlob?: Blob | null;
  isProcessing?: boolean;
  onReady?: () => void;
  fallback?: React.ReactNode;
}

/**
 * Video-based talking avatar.
 * 
 * Takes audio from the AI response → sends to SadTalker server →
 * plays the generated talking face video.
 * 
 * Falls back to the 3D avatar if the server is unreachable.
 */
export default function TalkingAvatar({ audioBlob, isProcessing, onReady, fallback }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');
  const [isGenerating, setIsGenerating] = useState(false);

  // Check if SadTalker server is running
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch('http://localhost:8765/health', {
          signal: AbortSignal.timeout(2000),
        });
        if (res.ok) setServerStatus('available');
        else setServerStatus('unavailable');
      } catch {
        setServerStatus('unavailable');
      }
    };
    check();
  }, []);

  // When audio is provided, generate talking video
  useEffect(() => {
    if (!audioBlob || serverStatus !== 'available') return;
    
    const generate = async () => {
      setIsGenerating(true);
      try {
        const audioBase64 = await blobToBase64(audioBlob);
        
        const res = await fetch('http://localhost:8765/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audio: audioBase64.split(',')[1] }),
        });
        
        if (!res.ok) throw new Error('Generation failed');
        
        const data = await res.json();
        setVideoUrl(`http://localhost:8765${data.video_url}`);
        onReady?.();
      } catch (err) {
        console.error('Talking avatar error:', err);
      } finally {
        setIsGenerating(false);
      }
    };
    
    generate();
  }, [audioBlob, serverStatus, onReady]);

  // Auto-play video when URL changes
  useEffect(() => {
    if (videoUrl && videoRef.current) {
      videoRef.current.src = videoUrl;
      videoRef.current.play().catch(() => {});
    }
  }, [videoUrl]);

  // Fallback to 3D avatar if server unavailable
  if (serverStatus === 'unavailable') {
    return <>{fallback}</>;
  }

  return (
    <div
      style={{
        width: '100%',
        height: 340,
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#0a0a1a',
        position: 'relative',
        border: '1px solid var(--border)',
      }}
    >
      {/* Video player */}
      <video
        ref={videoRef}
        autoPlay
        muted={false}
        loop
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '16px',
        }}
      />

      {/* Loading overlay */}
      {(isGenerating || isProcessing) && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,26,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <div style={{ fontSize: '2rem' }}>🎬</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {isGenerating ? 'Generating talking avatar...' : 'Processing...'}
          </div>
        </div>
      )}

      {/* Status indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '0.75rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '20px',
          background: 'rgba(0,0,0,0.6)',
          fontSize: '0.75rem',
          color: serverStatus === 'available' ? 'var(--green)' : 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: serverStatus === 'available' ? 'var(--green)' : 'var(--text-muted)' }} />
        {serverStatus === 'available' ? 'AI Avatar' : '3D Fallback'}
      </div>
    </div>
  );
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

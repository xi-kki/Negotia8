'use client';

import { useRef, useEffect } from 'react';

interface Props {
  isActive: boolean;
}

/**
 * Canvas-based audio visualizer ring that pulses around the avatar
 * when the AI is speaking.
 */
export default function VoiceVisualizer({ isActive }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const phaseRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.38;

      if (isActive) {
        phaseRef.current += 0.03;

        // Draw multiple concentric rings
        for (let ring = 0; ring < 3; ring++) {
          const points = 48;
          const phase = phaseRef.current + ring * 1.2;

          ctx.beginPath();
          for (let i = 0; i <= points; i++) {
            const angle = (i / points) * Math.PI * 2;
            const pulse = Math.sin(phase + i * 0.3) * 0.08 + 1;
            const r = maxR * (0.85 + ring * 0.08) * pulse;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();

          const alpha = 0.15 - ring * 0.04;
          ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 1.5 + ring * 0.5;
          ctx.stroke();
        }

        // Inner glow
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.6);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.06)');
        gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * 0.6, 0, Math.PI * 2);
        ctx.fill();
      } else {
        phaseRef.current = 0;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        borderRadius: '16px',
      }}
    />
  );
}

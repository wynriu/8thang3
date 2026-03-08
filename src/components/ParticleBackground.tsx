"use client";

import React, { useEffect, useState } from 'react';

const MAGIC_EMOJIS = ['✨', '💖', '🌟', '🍀', '🌸', '🎈', '🎁', '🌙', '☀️', '🌈', '🪄', '💎'];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  symbol: string;
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Tạo 40-60 hạt ngẫu nhiên để đảm bảo mật độ vừa phải
    const count = Math.floor(Math.random() * 20) + 40;
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 20 + 10, // Kích thước từ 10px đến 30px
      symbol: MAGIC_EMOJIS[Math.floor(Math.random() * MAGIC_EMOJIS.length)],
      duration: Math.random() * 20 + 20, // Chuyển động chậm từ 20s đến 40s
      delay: Math.random() * -40,
      blur: Math.random() * 2, // Độ mờ ngẫu nhiên từ 0 đến 2px
      opacity: Math.random() * 0.15 + 0.05, // Độ trong suốt rất thấp (5% - 20%)
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-500">
      {/* Lớp phủ gradient nền nhẹ */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 dark:from-primary/10 to-transparent" />
      
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle animate-particle-drift select-none"
          style={{
            left: `${p.x}%`,
            bottom: `-10%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            filter: `blur(${p.blur}px)`,
          }}
        >
          <span className="animate-float-slow block">
            {p.symbol}
          </span>
        </div>
      ))}
    </div>
  );
}

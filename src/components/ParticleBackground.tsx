"use client";

import React, { useEffect, useState } from 'react';

// Sử dụng các biểu tượng trái tim nhỏ li ti
const HEART_SYMBOLS = ['❤', '♥', '❣', '❥', '❦'];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  symbol: string;
  duration: number;
  delay: number;
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Tạo nhiều hạt nhỏ hơn để giống như cát li ti
    const count = 60;
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 4, // Rất nhỏ (4px - 10px)
      symbol: HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)],
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -20, // Bắt đầu ở các thời điểm khác nhau
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-[#FFF0F6]">
      {/* Lớp phủ màu hồng nhẹ để tạo cảm giác ấm áp */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100/20 to-transparent" />
      
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle animate-particle-drift text-primary/30"
          style={{
            left: `${p.x}%`,
            bottom: `-20px`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <span className="animate-sand-pulse block">
            {p.symbol}
          </span>
        </div>
      ))}
    </div>
  );
}

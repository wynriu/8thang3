"use client";

import React, { useEffect, useState } from 'react';

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
    // Tăng số lượng hạt lên một chút để trông lung linh hơn
    const count = 50;
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 4,
      symbol: HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)],
      duration: Math.random() * 12 + 15,
      delay: Math.random() * -30,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-500">
      {/* Lớp phủ gradient nhẹ */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 dark:from-primary/10 to-transparent" />
      
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle animate-particle-drift text-primary/20 dark:text-primary/10"
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

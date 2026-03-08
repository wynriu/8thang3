
"use client";

import React, { useEffect, useState } from 'react';

const EMOJIS = ['💖', '✨', '🌸', '💝', '🎉', '🥂', '👑', '💄', '🌹', '💃'];

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
  duration: number;
  delay: number;
}

export function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const count = 25;
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100 + 100, // Start below viewport
      size: Math.random() * 20 + 15,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 10,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle animate-particle opacity-40 grayscale-[0.2]"
          style={{
            left: `${p.x}%`,
            bottom: `-50px`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}

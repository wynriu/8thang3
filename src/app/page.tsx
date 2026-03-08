"use client";

import React, { useState, useEffect } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { FortuneForm } from '@/components/FortuneForm';
import { FortuneCard } from '@/components/FortuneCard';
import { generatePersonalizedFortune } from '@/ai/flows/generate-personalized-fortune-flow';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Stars, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [fortuneData, setFortuneData] = useState<{ name: string; fortune: string } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { toast } = useToast();

  useEffect(() => {
    // Khôi phục theme từ localStorage nếu có
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleGenerateFortune = async (input: { name: string; birthYear: number }) => {
    setIsLoading(true);
    try {
      const result = await generatePersonalizedFortune(input);
      setFortuneData({ name: input.name, fortune: result.fortune });
    } catch (error) {
      console.error("Lỗi khi tạo lời chúc:", error);
      toast({
        variant: "destructive",
        title: "Phép màu bị gián đoạn...",
        description: "Chúng tôi không thể kết nối với những vì sao lúc này. Vui lòng thử lại sau!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFortuneData(null);
  };

  return (
    <main className="relative h-screen w-full flex flex-col items-center justify-between p-4 overflow-hidden bg-background">
      {/* Nền hạt li ti */}
      <ParticleBackground />
      
      {/* Header */}
      <header className="z-10 w-full text-center pt-2 md:pt-6 animate-in fade-in slide-in-from-top-4 duration-1000 shrink-0">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-primary/20 shadow-sm mb-2">
          <Stars className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-primary uppercase">Món Quà Phép Màu</span>
          <Sparkles className="w-3 h-3 text-accent animate-sparkle" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-accent drop-shadow-sm leading-tight">
          Quà Tặng<span className="text-primary italic">May Mắn</span>
        </h1>
        <p className="text-primary/70 dark:text-primary/50 font-medium text-sm md:text-base mt-1">
          Khám phá những lời chúc dành riêng cho bạn
        </p>
      </header>

      {/* Content chính - Tự động căn giữa */}
      <section className="z-10 w-full flex-1 flex items-center justify-center perspective-1000 max-w-lg mx-auto py-4 overflow-hidden">
        {!fortuneData ? (
          <div className="w-full scale-90 md:scale-100 transition-transform">
            <FortuneForm onSubmit={handleGenerateFortune} isLoading={isLoading} />
          </div>
        ) : (
          <div className="w-full scale-90 md:scale-100 transition-transform">
            <FortuneCard 
              name={fortuneData.name} 
              fortune={fortuneData.fortune} 
              onReset={handleReset} 
            />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="z-10 w-full text-center pb-4 shrink-0">
        <p className="text-primary/50 font-medium text-xs">©2026 VinVibeCode</p>
        <div className="flex justify-center gap-4 mt-2 text-lg">
           <span className="animate-float-slow opacity-40">✨</span>
           <span className="animate-heart-beat opacity-60">💝</span>
           <span className="animate-float-fast opacity-40">✨</span>
        </div>
      </footer>

      {/* Nút Dark Mode nổi */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-50 rounded-full w-12 h-12 shadow-xl border-2 border-primary/20 bg-background/80 backdrop-blur-md hover:scale-110 transition-all"
        aria-label="Toggle theme"
      >
        {theme === 'light' ? (
          <Moon className="w-6 h-6 text-primary" />
        ) : (
          <Sun className="w-6 h-6 text-yellow-400" />
        )}
      </Button>

      {/* Trang trí nền */}
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-1 animate-pulse" />
      <div className="fixed -bottom-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-1 animate-pulse" />
    </main>
  );
}

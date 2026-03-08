
"use client";

import React, { useState, useEffect } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { FortuneForm } from '@/components/FortuneForm';
import { FortuneCard } from '@/components/FortuneCard';
import { generatePersonalizedFortune } from '@/ai/flows/generate-personalized-fortune-flow';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Moon, Sun, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [fortuneData, setFortuneData] = useState<{ name: string; fortune: string } | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { toast } = useToast();

  useEffect(() => {
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
      <ParticleBackground />
      
      {/* Header */}
      <header className="z-10 w-full text-center pt-4 md:pt-8 animate-in fade-in slide-in-from-top-4 duration-1000 shrink-0">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/40 dark:bg-black/20 backdrop-blur-md border border-primary/20 shadow-sm mb-2">
          <Heart className="w-4 h-4 text-primary animate-pulse fill-primary" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Món Quà 8/3 Ý Nghĩa</span>
          <Sparkles className="w-3 h-3 text-accent animate-sparkle" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-accent drop-shadow-sm leading-tight">
          Quà Tặng <br /> 
          <span className="text-primary italic">Dành cho bạn</span>
        </h1>
      </header>

      {/* Content chính */}
      <section className="z-10 w-full flex-1 flex items-center justify-center max-w-lg mx-auto py-4 overflow-hidden">
        {!fortuneData ? (
          <div className="w-full transform scale-95 md:scale-100 transition-all duration-500">
            <FortuneForm onSubmit={handleGenerateFortune} isLoading={isLoading} />
          </div>
        ) : (
          <div className="w-full transform scale-95 md:scale-100 transition-all duration-500">
            <FortuneCard 
              name={fortuneData.name} 
              fortune={fortuneData.fortune} 
              onReset={handleReset} 
            />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="z-10 w-full text-center pb-6 shrink-0">
        <p className="text-primary/60 font-bold text-xs tracking-widest uppercase">©2026 VinVibeCode</p>
        <div className="flex justify-center gap-6 mt-3 text-xl opacity-40">
           <span className="animate-float-slow">🌸</span>
           <span className="animate-heart-beat">💝</span>
           <span className="animate-float-fast">🌷</span>
        </div>
      </footer>

      {/* Nút Dark Mode */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 z-50 rounded-2xl w-12 h-12 shadow-2xl border-2 border-primary/20 bg-background/80 backdrop-blur-md hover:scale-110 active:scale-90 transition-all"
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

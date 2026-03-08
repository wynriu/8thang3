"use client";

import React, { useState } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { FortuneForm } from '@/components/FortuneForm';
import { FortuneCard } from '@/components/FortuneCard';
import { generatePersonalizedFortune } from '@/ai/flows/generate-personalized-fortune-flow';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Stars } from 'lucide-react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [fortuneData, setFortuneData] = useState<{ name: string; fortune: string } | null>(null);
  const { toast } = useToast();

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
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Các yếu tố nền */}
      <ParticleBackground />
      
      <div className="z-10 w-full flex flex-col items-center gap-6">
        <header className="text-center space-y-3 mb-2 animate-in fade-in slide-in-from-top-4 duration-1000">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur-md border border-primary/20 shadow-sm mb-2">
            <Stars className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm font-bold tracking-[0.2em] text-primary uppercase">Món Quà Phép Màu</span>
            <Sparkles className="w-4 h-4 text-accent animate-sparkle" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-accent drop-shadow-sm">
            Quà Tặng<span className="text-primary italic">May Mắn</span>
          </h1>
          <p className="text-primary/70 font-medium max-w-[320px] mx-auto text-lg">
            Khám phá những lời chúc dành riêng cho tâm hồn bạn
          </p>
        </header>

        <section className="w-full flex justify-center perspective-1000">
          {!fortuneData ? (
            <FortuneForm onSubmit={handleGenerateFortune} isLoading={isLoading} />
          ) : (
            <FortuneCard 
              name={fortuneData.name} 
              fortune={fortuneData.fortune} 
              onReset={handleReset} 
            />
          )}
        </section>

        <footer className="mt-8 text-center text-primary/40 font-medium text-sm">
          <p>© {new Date().getFullYear()} Quà Tặng May Mắn</p>
          <div className="flex justify-center gap-6 mt-3 text-xl">
             <span className="animate-float-slow opacity-60">✨</span>
             <span className="animate-heart-beat">💝</span>
             <span className="animate-float-fast opacity-60">✨</span>
          </div>
        </footer>
      </div>

      {/* Các quầng sáng trang trí */}
      <div className="fixed -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-1 animate-pulse" />
      <div className="fixed -bottom-20 -right-20 w-80 h-80 bg-accent/20 rounded-full blur-[120px] -z-1 animate-pulse" />
    </main>
  );
}

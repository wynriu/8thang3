
"use client";

import React, { useState } from 'react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { FortuneForm } from '@/components/FortuneForm';
import { FortuneCard } from '@/components/FortuneCard';
import { generatePersonalizedFortune } from '@/ai/flows/generate-personalized-fortune-flow';
import { useToast } from '@/hooks/use-toast';
import { Sparkles } from 'lucide-react';

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
      console.error("Error generating fortune:", error);
      toast({
        variant: "destructive",
        title: "The magic flickered...",
        description: "We couldn't reach the stars right now. Please try again!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFortuneData(null);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* Background elements */}
      <ParticleBackground />
      
      <div className="z-10 w-full flex flex-col items-center gap-8">
        <header className="text-center space-y-2 mb-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-primary/20 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-primary animate-sparkle" />
            <span className="text-xs font-bold tracking-widest text-primary uppercase">International Celebration</span>
            <Sparkles className="w-4 h-4 text-primary animate-sparkle" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-headline tracking-tighter text-accent drop-shadow-sm">
            Celebration<span className="text-primary italic">Fortunes</span>
          </h1>
          <p className="text-muted-foreground font-medium max-w-[280px] mx-auto">
            Personalized wishes for a brighter tomorrow
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

        <footer className="mt-12 text-center text-primary/60 font-medium">
          <p>© {new Date().getFullYear()} CelebrationFortunes</p>
          <div className="flex justify-center gap-4 mt-2">
             <span className="animate-float-slow">✨</span>
             <span className="animate-float-medium">💖</span>
             <span className="animate-float-fast">✨</span>
          </div>
        </footer>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-1" />
      <div className="fixed bottom-10 right-10 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-1" />
    </main>
  );
}

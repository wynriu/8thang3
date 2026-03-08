"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Sparkles, RefreshCw, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FortuneCardProps {
  name: string;
  fortune: string;
  onReset: () => void;
}

export function FortuneCard({ name, fortune, onReset }: FortuneCardProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const text = `✨ Lời Chúc May Mắn Của Tôi ✨\n\n"${fortune}"\n\nĐược tạo bởi Quà Tặng May Mắn 💖`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lời Chúc May Mắn Của Tôi',
          text: text,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Lỗi khi chia sẻ:", err);
      }
    } else {
      navigator.clipboard.writeText(text);
      toast({
        title: "Đã sao chép!",
        description: "Lời chúc của bạn đã sẵn sàng để chia sẻ.",
      });
    }
  };

  return (
    <div className="w-full max-w-md animate-in zoom-in-95 fade-in duration-500">
      <Card className="card-gold-border relative overflow-hidden shadow-2xl bg-white/95">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <CardContent className="pt-12 pb-10 px-8 text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-6 bg-primary/10 rounded-full animate-pulse" />
              <div className="bg-gradient-to-br from-primary to-accent p-5 rounded-3xl shadow-lg animate-heart-beat">
                <Gift className="w-12 h-12 text-white" />
              </div>
              <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-yellow-500 animate-sparkle" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold font-headline text-accent uppercase tracking-widest">
              Món quà cho {name}
            </h3>
            <div className="relative p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <span className="absolute -top-3 left-4 text-4xl text-primary/20 font-serif">“</span>
              <p className="text-2xl font-medium leading-relaxed italic text-foreground/90 font-body relative z-10">
                {fortune}
              </p>
              <span className="absolute -bottom-8 right-4 text-4xl text-primary/20 font-serif">”</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              onClick={handleShare}
              variant="default" 
              className="flex-1 rounded-full py-7 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all hover:scale-105 shadow-md"
            >
              <Share2 className="mr-2 w-5 h-5" />
              Chia sẻ niềm vui
            </Button>
            <Button 
              onClick={onReset}
              variant="outline" 
              className="rounded-full py-7 px-8 border-2 border-primary/20 hover:bg-primary/10 transition-all"
            >
              <RefreshCw className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </CardContent>

        <div className="absolute bottom-2 right-4 flex gap-1 opacity-20">
          <span className="text-xs gold-accent font-bold">QUÀ TẶNG MAY MẮN</span>
        </div>
      </Card>
      
      <p className="text-center mt-6 text-sm text-primary/60 font-medium animate-pulse">
        ✨ Chúc thông điệp này mang lại niềm vui cho bạn hôm nay! ✨
      </p>
    </div>
  );
}

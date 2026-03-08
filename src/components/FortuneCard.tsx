
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Sparkles, RefreshCw, Gift, Quote, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FortuneCardProps {
  name: string;
  fortune: string;
  onReset: () => void;
}

export function FortuneCard({ name, fortune, onReset }: FortuneCardProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    const text = `✨ Lời Chúc Phép Màu Tặng Nàng ✨\n\nGửi tặng ${name}: "${fortune}"\n\nĐược tạo bởi Món Quà 8/3 💖`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Lời Chúc Phép Màu 8/3',
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
        description: "Lời chúc phép màu đã sẵn sàng để gửi đi.",
      });
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto animate-in zoom-in-95 fade-in duration-500 flex flex-col items-center">
      <Card className="card-gold-border relative overflow-hidden shadow-[0_20px_50px_rgba(217,38,140,0.3)] bg-white/95 dark:bg-card/95 backdrop-blur-2xl transition-transform hover:scale-[1.01]">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <CardContent className="pt-8 pb-6 px-6 text-center flex flex-col items-center gap-4">
          {/* Icon nổi bật */}
          <div className="relative mb-2">
            <div className="absolute -inset-4 bg-primary/20 rounded-full animate-pulse blur-md" />
            <div className="relative bg-gradient-to-br from-primary to-accent p-4 rounded-[2rem] shadow-xl animate-heart-beat">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <Sparkles className="absolute -top-3 -right-3 w-6 h-6 text-yellow-500 animate-sparkle" />
          </div>

          <div className="w-full space-y-3">
            <h3 className="text-sm md:text-base font-black text-accent uppercase tracking-[0.3em]">
              Gửi tới {name}
            </h3>
            
            {/* Vùng nội dung có thể cuộn */}
            <div className="relative bg-primary/5 dark:bg-primary/10 rounded-3xl border border-primary/10 overflow-hidden">
              <div className="absolute top-2 left-3 opacity-10">
                <Quote className="w-8 h-8 text-primary rotate-180" />
              </div>
              
              <ScrollArea className="h-[180px] md:h-[220px] w-full px-6 py-8">
                <p className="text-base md:text-lg font-semibold leading-relaxed italic text-foreground/90 whitespace-pre-wrap">
                  {fortune}
                </p>
              </ScrollArea>

              <div className="absolute bottom-2 right-3 opacity-10">
                <Quote className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          {/* Nút điều khiển */}
          <div className="flex w-full gap-3 pt-2">
            <Button 
              onClick={handleShare}
              className="flex-1 rounded-2xl py-6 text-sm font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              <Share2 className="mr-2 w-4 h-4" />
              Gửi Tặng
            </Button>
            <Button 
              onClick={onReset}
              variant="outline" 
              className="rounded-2xl py-6 px-6 border-2 border-primary/20 hover:bg-primary/5 text-primary transition-all active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>

        <div className="absolute bottom-1 right-3 opacity-30 select-none">
          <span className="text-[7px] font-black tracking-tighter text-primary">VVC © 2026</span>
        </div>
      </Card>
      
      <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/30 dark:bg-black/20 backdrop-blur-sm border border-white/20 animate-bounce">
         <span className="text-[10px] font-bold text-primary/80 uppercase">Trao gửi yêu thương ✨</span>
      </div>
    </div>
  );
}

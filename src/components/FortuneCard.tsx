"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Heart, Sparkles, RefreshCw } from "lucide-react";
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
      <Card className="card-gold-border relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
        
        <CardContent className="pt-12 pb-10 px-8 text-center space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/10 rounded-full animate-pulse" />
              <Heart className="w-16 h-16 text-primary fill-primary animate-float-medium" />
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-sparkle" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold font-headline text-accent uppercase tracking-widest">
              Món quà cho {name}
            </h3>
            <p className="text-2xl font-medium leading-relaxed italic text-foreground/90 font-body">
              &ldquo;{fortune}&rdquo;
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              onClick={handleShare}
              variant="default" 
              className="flex-1 rounded-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 transition-all hover:scale-105"
            >
              <Share2 className="mr-2 w-5 h-5" />
              Chia sẻ niềm vui
            </Button>
            <Button 
              onClick={onReset}
              variant="outline" 
              className="rounded-full py-6 px-6 border-2 border-primary/20 hover:bg-primary/10 transition-all"
            >
              <RefreshCw className="w-5 h-5 text-primary" />
            </Button>
          </div>
        </CardContent>

        <div className="absolute bottom-2 right-4 flex gap-1 opacity-20">
          <span className="text-xs gold-accent font-bold">QUÀ TẶNG MAY MẮN</span>
        </div>
      </Card>
      
      <p className="text-center mt-6 text-sm text-muted-foreground animate-pulse">
        💖 Chúc thông điệp này mang lại niềm vui cho bạn hôm nay! 💖
      </p>
    </div>
  );
}

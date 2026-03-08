"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Heart, Gift, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  birthYear: z.coerce.number().min(1900, "Năm sinh không hợp lệ").max(new Date().getFullYear(), "Năm sinh không thể ở tương lai"),
});

interface FortuneFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
}

const ROTATING_MESSAGES = [
  "hãy cho tui biết tên bạn nhé😉",
  "bạn là ai tui đìu sẽ chúc😙",
  "hy vọng ko bug🐧😭",
  "8/3 có lời chúc nào chưa, níu chưa thì zô đây😏",
  "hôm nay zuiii hong🥹",
  "awwwww😛"
];

export function FortuneForm({ onSubmit, isLoading }: FortuneFormProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      birthYear: 2007,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % ROTATING_MESSAGES.length);
        setIsVisible(true);
      }, 500); // Đợi hiệu ứng fade out xong mới đổi chữ
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full border-none shadow-2xl bg-white/80 dark:bg-card/90 backdrop-blur-xl rounded-[2.5rem] overflow-hidden animate-in zoom-in-95 duration-700">
      <CardHeader className="space-y-1 text-center pb-0 pt-8">
        <div className="flex justify-center mb-3">
          <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-3xl animate-heart-beat">
            <Gift className="w-10 h-10 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">
          Lời Chúc <span className="text-primary italic">Phép Màu</span>
        </CardTitle>
        <CardDescription className={cn(
          "text-sm text-primary/60 dark:text-primary/40 font-medium transition-all duration-500 min-h-[20px]",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}>
          {ROTATING_MESSAGES[messageIndex]}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 md:p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-foreground/80">Nhập tên bạn</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nhập tên bạn..." 
                      className="rounded-2xl border-2 border-primary/10 focus:border-primary py-6 text-base transition-all bg-white/50 dark:bg-black/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-foreground/80">Năm sinh</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ví dụ: 2007"
                      className="rounded-2xl border-2 border-primary/10 focus:border-primary py-6 text-base transition-all bg-white/50 dark:bg-black/20"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-7 text-lg font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 flex gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 text-white" />
                  <span className="animate-shimmer-pink font-black text-white">Đang chuẩn bị quà...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-white" />
                  Nhận Lời Chúc Phép Màu
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
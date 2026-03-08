"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Stars, Gift } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  birthYear: z.coerce.number().min(1900, "Năm sinh không hợp lệ").max(new Date().getFullYear(), "Năm sinh không thể ở tương lai"),
});

interface FortuneFormProps {
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  isLoading: boolean;
}

export function FortuneForm({ onSubmit, isLoading }: FortuneFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      birthYear: 1990,
    },
  });

  return (
    <Card className="w-full max-w-md border-none shadow-2xl bg-white/90 backdrop-blur-md rounded-[2.5rem] overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
      <CardHeader className="space-y-2 text-center pb-2 pt-10">
        <div className="flex justify-center mb-4">
          <div className="bg-primary/10 p-5 rounded-3xl animate-heart-beat">
            <Gift className="w-12 h-12 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold text-foreground">
          Lời Chúc <span className="text-primary italic">Dành Cho Bạn</span>
        </CardTitle>
        <CardDescription className="text-base text-primary/60">
          Nhập thông tin để mở hộp quà tinh thần này
        </CardDescription>
      </CardHeader>
      <CardContent className="p-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-foreground/80">Tên của bạn</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Nhập tên của bạn..." 
                      className="rounded-2xl border-2 border-primary/10 focus:border-primary py-7 text-lg transition-all bg-white/50"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-foreground/80">Năm sinh</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Ví dụ: 1995"
                      className="rounded-2xl border-2 border-primary/10 focus:border-primary py-7 text-lg transition-all bg-white/50"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-8 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 flex gap-2"
            >
              {isLoading ? (
                <>
                  <Sparkles className="animate-spin w-7 h-7" />
                  Đang tạo phép màu...
                </>
              ) : (
                <>
                  <Stars className="w-7 h-7" />
                  Khám Phá Ngay
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

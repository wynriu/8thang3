
"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Stars, Heart } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  birthYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
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
    <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden animate-in slide-in-from-bottom-10 duration-700">
      <CardHeader className="space-y-2 text-center pb-2 pt-8">
        <div className="flex justify-center mb-2">
          <div className="bg-primary/10 p-4 rounded-2xl">
            <Stars className="w-10 h-10 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold font-headline text-foreground">
          Your Celebration <span className="text-primary italic">Fortune</span>
        </CardTitle>
        <CardDescription className="text-lg text-muted-foreground">
          Enter your details to receive a magical wish
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-foreground/80">Beautiful Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter your name..." 
                      className="rounded-xl border-2 border-primary/10 focus:border-primary py-6 text-lg transition-all bg-white"
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
                  <FormLabel className="text-base font-semibold text-foreground/80">Year of Birth</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g. 1995"
                      className="rounded-xl border-2 border-primary/10 focus:border-primary py-6 text-lg transition-all bg-white"
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
              className="w-full py-8 text-xl font-bold rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 flex gap-2"
            >
              {isLoading ? (
                <>
                  <Sparkles className="animate-spin w-6 h-6" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Heart className="w-6 h-6 fill-white" />
                  Reveal My Fortune
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

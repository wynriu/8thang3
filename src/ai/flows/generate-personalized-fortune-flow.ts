'use server';
/**
 * @fileOverview A Genkit flow for generating personalized fortunes and wishes.
 *
 * - generatePersonalizedFortune - A function that handles the generation of a personalized fortune.
 * - GeneratePersonalizedFortuneInput - The input type for the generatePersonalizedFortune function.
 * - GeneratePersonalizedFortuneOutput - The return type for the generatePersonalizedFortune function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePersonalizedFortuneInputSchema = z.object({
  name: z.string().describe("The user's name."),
  birthYear: z.number().describe("The user's birth year."),
});
export type GeneratePersonalizedFortuneInput = z.infer<typeof GeneratePersonalizedFortuneInputSchema>;

const GeneratePersonalizedFortuneOutputSchema = z.object({
  fortune: z.string().describe('A personalized, uplifting fortune or wish for the user.'),
});
export type GeneratePersonalizedFortuneOutput = z.infer<typeof GeneratePersonalizedFortuneOutputSchema>;

export async function generatePersonalizedFortune(input: GeneratePersonalizedFortuneInput): Promise<GeneratePersonalizedFortuneOutput> {
  return generatePersonalizedFortuneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedFortunePrompt',
  input: { schema: GeneratePersonalizedFortuneInputSchema },
  output: { schema: GeneratePersonalizedFortuneOutputSchema },
  prompt: `You are an AI assistant that crafts unique, uplifting, and personalized fortunes and wishes for celebratory occasions.

Generate a single, inspiring fortune or wish for the user based on their name and birth year. Make sure the message is positive, encouraging, and feels specially crafted for them, suitable for events like International Women's Day or other personal celebrations.

User's Name: {{{name}}}
User's Birth Year: {{{birthYear}}}`,
});

const generatePersonalizedFortuneFlow = ai.defineFlow(
  {
    name: 'generatePersonalizedFortuneFlow',
    inputSchema: GeneratePersonalizedFortuneInputSchema,
    outputSchema: GeneratePersonalizedFortuneOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

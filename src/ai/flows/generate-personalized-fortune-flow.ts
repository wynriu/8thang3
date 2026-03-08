'use server';
/**
 * @fileOverview Một luồng Genkit để tạo các lời chúc và vận may cá nhân hóa.
 *
 * - generatePersonalizedFortune - Hàm xử lý việc tạo vận may cá nhân.
 * - GeneratePersonalizedFortuneInput - Kiểu dữ liệu đầu vào cho hàm.
 * - GeneratePersonalizedFortuneOutput - Kiểu dữ liệu đầu ra cho hàm.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePersonalizedFortuneInputSchema = z.object({
  name: z.string().describe("Tên của người dùng."),
  birthYear: z.number().describe("Năm sinh của người dùng."),
});
export type GeneratePersonalizedFortuneInput = z.infer<typeof GeneratePersonalizedFortuneInputSchema>;

const GeneratePersonalizedFortuneOutputSchema = z.object({
  fortune: z.string().describe('Một lời chúc hoặc vận may cá nhân hóa, tích cực dành cho người dùng.'),
});
export type GeneratePersonalizedFortuneOutput = z.infer<typeof GeneratePersonalizedFortuneOutputSchema>;

export async function generatePersonalizedFortune(input: GeneratePersonalizedFortuneInput): Promise<GeneratePersonalizedFortuneOutput> {
  return generatePersonalizedFortuneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedFortunePrompt',
  input: { schema: GeneratePersonalizedFortuneInputSchema },
  output: { schema: GeneratePersonalizedFortuneOutputSchema },
  prompt: `Bạn là một trợ lý AI chuyên sáng tạo những lời chúc và vận may độc đáo, truyền cảm hứng và mang tính cá nhân hóa cao cho các dịp kỷ niệm.

Hãy tạo một lời chúc hoặc vận may duy nhất, đầy cảm hứng cho người dùng dựa trên tên và năm sinh của họ. Đảm bảo thông điệp bằng TIẾNG VIỆT, mang tính tích cực, khích lệ và tạo cảm giác được dành riêng cho họ. Phù hợp cho các sự kiện như Ngày Quốc tế Phụ nữ hoặc các lễ kỷ niệm cá nhân khác.

Tên người dùng: {{{name}}}
Năm sinh: {{{birthYear}}}`,
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

'use server';
/**
 * @fileOverview Một luồng Genkit để tạo các lời chúc và vận may cá nhân hóa cho ngày 8/3.
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
  fortune: z.string().describe('Một lời chúc hoặc vận may cá nhân hóa, ý nghĩa dành cho phụ nữ nhân ngày 8/3.'),
});
export type GeneratePersonalizedFortuneOutput = z.infer<typeof GeneratePersonalizedFortuneOutputSchema>;

export async function generatePersonalizedFortune(input: GeneratePersonalizedFortuneInput): Promise<GeneratePersonalizedFortuneOutput> {
  return generatePersonalizedFortuneFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePersonalizedFortunePrompt',
  input: { schema: GeneratePersonalizedFortuneInputSchema },
  output: { schema: GeneratePersonalizedFortuneOutputSchema },
  prompt: `Bạn là một trợ lý AI chuyên sáng tạo những lời chúc 8/3 độc đáo, truyền cảm hứng và mang tính cá nhân hóa cao dành cho phái đẹp.

Hãy tạo một lời chúc duy nhất, đầy cảm hứng, tôn vinh và mang lại may mắn cho người dùng nhân ngày Quốc tế Phụ nữ 8/3 dựa trên tên và năm sinh của họ. Đảm bảo thông điệp bằng TIẾNG VIỆT, mang tính chân thành, khích lệ và tạo cảm giác họ là người phụ nữ tuyệt vời nhất.

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

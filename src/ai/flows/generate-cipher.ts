// src/ai/flows/generate-cipher.ts
'use server';

/**
 * @fileOverview Generates an AI-created cipher for the Mật Mã Liên Hoàn game.
 *
 * - generateCipher - A function that generates a new cipher using AI.
 * - GenerateCipherInput - The input type for the generateCipher function.
 * - GenerateCipherOutput - The return type for the generateCipher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCipherInputSchema = z.object({
  difficultyLevel: z
    .number()
    .describe(
      'The difficulty level of the cipher, influencing the complexity of the encryption.'
    ),
});
export type GenerateCipherInput = z.infer<typeof GenerateCipherInputSchema>;

const GenerateCipherOutputSchema = z.object({
  cipherText: z.string().describe('The encrypted message.'),
  plainText: z.string().describe('The original, unencrypted message.'),
  encryptionMethod: z.string().describe('The method used to encrypt the message.'),
});
export type GenerateCipherOutput = z.infer<typeof GenerateCipherOutputSchema>;

export async function generateCipher(input: GenerateCipherInput): Promise<GenerateCipherOutput> {
  return generateCipherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCipherPrompt',
  input: {schema: GenerateCipherInputSchema},
  output: {schema: GenerateCipherOutputSchema},
  prompt: `Bạn là một chuyên gia mật mã học, với kinh nghiệm tạo ra các шифр (cipher) phức tạp và thú vị cho các trò chơi giải đố.

  Dựa trên độ khó yêu cầu, hãy tạo ra một thông điệp đã mã hóa (cipherText), thông điệp gốc (plainText) và phương pháp mã hóa (encryptionMethod).
  Thông điệp gốc nên có ý nghĩa và phù hợp với trò chơi giải đố. Phương pháp mã hóa nên rõ ràng và có thể giải thích được.

  Độ khó: {{{difficultyLevel}}}

  Trả về kết quả theo định dạng JSON sau:
  {
    "cipherText": "<thông điệp đã mã hóa>",
    "plainText": "<thông điệp gốc>",
    "encryptionMethod": "<phương pháp mã hóa>"
  }`,
});

const generateCipherFlow = ai.defineFlow(
  {
    name: 'generateCipherFlow',
    inputSchema: GenerateCipherInputSchema,
    outputSchema: GenerateCipherOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

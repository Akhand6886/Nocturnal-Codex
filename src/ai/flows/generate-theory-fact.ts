'use server';

/**
 * @fileOverview Generates a random computer science or mathematical theory fact.
 *
 * - generateTheoryFact - A function that returns a randomly generated computer science or mathematical theory fact.
 * - GenerateTheoryFactOutput - The return type for the generateTheoryFact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTheoryFactOutputSchema = z.object({
  fact: z.string().describe('A randomly generated computer science or mathematical theory fact.'),
});
export type GenerateTheoryFactOutput = z.infer<typeof GenerateTheoryFactOutputSchema>;

export async function generateTheoryFact(): Promise<GenerateTheoryFactOutput> {
  return generateTheoryFactFlow();
}

const prompt = ai.definePrompt({
  name: 'generateTheoryFactPrompt',
  output: {schema: GenerateTheoryFactOutputSchema},
  prompt: `You are an expert in computer science and mathematics theories.
  Generate a single interesting and surprising fact about computer science or mathematics.
  The fact should be no more than 2 sentences long.
  The fact must be accessible and intriguing to computer science students, developers, hackers, and theory enthusiasts.
  Do not include any introductory or concluding remarks. Only output the fact.
  `,
});

const generateTheoryFactFlow = ai.defineFlow(
  {
    name: 'generateTheoryFactFlow',
    outputSchema: GenerateTheoryFactOutputSchema,
  },
  async () => {
    const {output} = await prompt({});
    return output!;
  }
);

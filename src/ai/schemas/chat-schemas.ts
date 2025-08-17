/**
 * @fileOverview Schemas and types for the SareeShree chatbot.
 *
 * - ChatMessageSchema - Zod schema for a single chat message.
 * - ChatMessage - TypeScript type for a single chat message.
 * - ChatInputSchema - Zod schema for the chat flow input.
 * - ChatInput - TypeScript type for the chat flow input.
 * - ChatOutputSchema - Zod schema for the chat flow output.
 * - ChatOutput - TypeScript type for the chat flow output.
 */

import { z } from 'genkit';

export const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  message: z.string().describe('The latest message from the user.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  response: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

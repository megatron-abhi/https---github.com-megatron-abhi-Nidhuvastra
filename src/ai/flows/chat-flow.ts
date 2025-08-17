'use server';
/**
 * @fileOverview A customer support chatbot flow for SareeShree.
 *
 * - chat - A function that handles the chatbot conversation.
 */

import { ai } from '@/ai/genkit';
import { products } from '@/lib/mock-data';
import { z } from 'genkit';
import { ChatInputSchema, ChatOutputSchema, type ChatInput, type ChatOutput } from '@/ai/schemas/chat-schemas';

const raiseSupportTicket = ai.defineTool(
  {
    name: 'raiseSupportTicket',
    description:
      'Use this tool when the user wants to raise a ticket or when their query cannot be resolved with the available information. Ask for their name, email, and a description of the issue before calling this tool.',
    inputSchema: z.object({
      name: z.string().describe("The user's full name."),
      email: z.string().email().describe("The user's email address."),
      description: z.string().describe('A detailed description of the issue.'),
    }),
    outputSchema: z.object({
      ticketId: z.string(),
      status: z.string(),
    }),
  },
  async (input) => {
    console.log('Support ticket raised:', input);
    // In a real application, this would integrate with a helpdesk system (e.g., Zendesk, Jira).
    const ticketId = `TICKET-${Date.now()}`;
    return {
      ticketId,
      status: 'open',
    };
  }
);

const chatFlowPrompt = ai.definePrompt({
  name: 'chatFlowPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  tools: [raiseSupportTicket],
  system: `You are a friendly and helpful customer support agent for SareeShree, an online store that sells high-quality Indian ethnic sarees.

Your goal is to answer customer questions, provide information about products, and help with order inquiries.

Here are the store policies:
- Free shipping on all orders above ₹5000.
- Easy 7-day returns. Customers should read the return policy for more details.
- We are located in India and currently only ship within India.

Here is the list of available products. Use this information to answer product-related questions. Do not make up products or details.
Product Information:
---
{{#each products}}
- **{{name}}**:
  - **Category**: {{category}}
  - **Price**: ₹{{price}}
  - **Description**: {{description}}
  - **Available Colors**: {{#each colors}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
---
{{/each}}

Interaction Guidelines:
- Be polite, empathetic, and professional.
- Keep your responses concise and to the point.
- If you don't know the answer to a question, say so. Do not make up information.
- If the user's query cannot be resolved with the given information, or if they explicitly ask to raise a ticket, use the \`raiseSupportTicket\` tool. You MUST collect the user's name, email, and a description of the issue before calling the tool.
- After successfully raising a ticket, inform the user of the ticket ID and let them know that the support team will get in touch with them via email.

Conversation History:
{{#each history}}
- **{{role}}**: {{{content}}}
{{/each}}
`,
  prompt: `New user message: {{{message}}}`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ history, message }) => {
    const productInfo = { products };
    const llmResponse = await chatFlowPrompt({
        history,
        message,
        ...productInfo
    });

    const { output } = llmResponse;
    if (!output) {
      return { response: "I'm sorry, I couldn't generate a response. Please try again." };
    }
    
    // Check if a tool was called and handle the response
    const toolResponse = llmResponse.toolRequest?.responses[0];
    if (toolResponse?.name === 'raiseSupportTicket' && toolResponse.output) {
        const ticketInfo = toolResponse.output as { ticketId: string };
        return { response: `I have successfully raised a support ticket for you. Your ticket ID is ${ticketInfo.ticketId}. Our team will get back to you shortly.` };
    }

    return { response: output.response };
  }
);

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

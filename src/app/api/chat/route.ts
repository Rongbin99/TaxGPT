import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Set max duration for responses
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid input: messages must be a non-empty array.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await streamText({
      model: openai('gpt-4'),
      messages,
    });

    return new Response(result.toAIStream(), {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

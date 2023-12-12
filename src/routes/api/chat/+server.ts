import { OpenAIStream, StreamingTextResponse } from 'ai';
import { openai } from '$lib/services/openai';
import { dreamInterpretatorPrompt } from '$lib/helpers/prompts';
import type { RequestHandler } from '@sveltejs/kit';

export const config = {
    runtime: "edge"
}

export const POST = (async ({ request }: { request: Request}) => {
    // Extract the `prompt` from the body of the request
    const { messages, streaming = true } = await request.json();

    const messageList = messages.map((message: any) => ({
        content: message.content,
        role: message.role,
    }))
    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        stream: streaming,
        messages: [
            {
                role: 'assistant',
                content: dreamInterpretatorPrompt
            },
            ...messageList
        ],
        // max_tokens: 50
    });

    if(!streaming) return Response.json(response);

    // Convert the response into a friendly text-stream

    //@ts-expect-error
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

}) satisfies RequestHandler;
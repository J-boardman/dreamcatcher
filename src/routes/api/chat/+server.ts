import { OpenAIStream, StreamingTextResponse } from 'ai';

import { env } from '$env/dynamic/private';
// You may want to replace the above with a static private env variable
// for dead-code elimination and build-time type-checking:
// import { OPENAI_API_KEY } from '$env/static/private'

import { openai } from '$lib/helpers/openai';
import { dreamInterpretatorPrompt } from '$lib/prompts/prompts';
import type { Stream } from 'openai/streaming';
import type { ChatCompletionChunk } from 'openai/resources';
import type { RequestHandler } from '@sveltejs/kit';


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
        max_tokens: 50
    });

    if(!streaming) return Response.json(response);

    // Convert the response into a friendly text-stream

    //@ts-ignore
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}) satisfies RequestHandler;
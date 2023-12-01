import { imagePromptMessage } from "$lib/prompts/prompts";
import type { Message } from "ai";
import { handleChatRequest } from "./handleChatRequest";


export async function generateImagePrompt(messages: Message[], mood: string, setting: string): Promise<string | Error> {
    const initialPrompt = `${imagePromptMessage}. The image should be ${mood} and set in ${setting}.`;
    const [data, error] = await handleChatRequest(initialPrompt, messages);

    if(error){
        return error
    }

    return `${data?.choices[0].message.content}`
}
import type { Message } from "ai";
import { systemMessage } from "./systemMessage";
import type { ChatCompletion } from "openai/resources";

type ChatRequest = Promise<[ChatCompletion | null, Error | null]>

export async function handleChatRequest(newMessage: string, messages: Message[]): ChatRequest {
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [...messages, systemMessage(newMessage)],
                streaming: false
            }),
        })
        return [await response.json(), null]
    } catch (error) {
        return [null, error as Error]
    }
}
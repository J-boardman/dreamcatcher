import type { Message } from "ai";
import { handleFetch } from "./handleFetch";
import { systemMessage } from "./appendSystemMessage";

export async function handleChatRequest(newMessage: string, messages: Message[]) {
    const [data, error] = await handleFetch("/api/chat", {
        method: "POST",
        body: { messages: [...messages, systemMessage(newMessage)] },
        extras: { streaming: false }
    })

    if (error) {
        console.error(error)
        return error
    }

    return data;
}
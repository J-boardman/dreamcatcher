import type { Message } from "ai";

export function systemMessage(content: string, name: string = "hidden message"): Message {
    return {
        role: 'system',
        id: Math.random().toString(36).substring(2, 9),
        content,
        name
    };
}
import type { Message } from "ai";

export function systemMessage(content: string, name: string) {
    return {
        role: 'system',
        id: Math.random().toString(36).substring(2, 9),
        content,
        name
    } as Message;
}
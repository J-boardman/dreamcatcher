import { get } from "svelte/store";
import { type Conversation, conversations } from "./stores";
import { dreamInterpretatorPrompt } from "./prompts/prompts";

export function updateConversation(id: string, updatedItem: Partial<Conversation>) {
    conversations.update((prev) =>
        prev.map((item) => (item.id == id ? { ...item, updatedItem } : item))
    );
}

export function findConversation(id: string) {
    const conversationList = get(conversations)
    return conversationList.find(item => item.id == id)
}

export function addConversation(name?: string) {
    const newConversation: Conversation = {
        name: name,
        id: Math.random().toString(36).substring(2, 9),
        lastState: 'INTERPRETING',
        lastUpdated: new Date(),
        messageList: [
            {
                role: 'assistant',
                id: Math.random().toString(36).substring(2, 9),
                content: dreamInterpretatorPrompt
            }
        ],
    };
    conversations.update((prev) => [...prev, newConversation]);
    saveConversations();
    return newConversation;
}

export function deleteConversation(id: string) {
    conversations.update((prev) => prev.filter((item) => item.id != id));
    saveConversations()
}

export function saveConversations() {
    const conversationList = get(conversations)
    if (!localStorage) return;
    localStorage.setItem('conversations', JSON.stringify(conversationList));
}

export function loadConversations() {
    return JSON.parse(localStorage.getItem("conversations") || "[]")
}
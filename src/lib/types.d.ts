import type { Message } from "ai";

export type State =
    | 'INTERPRETING'
    | 'CONVERSATION_OVER'
    | 'GENERATING_CHAPTER_STORY'
    | 'STORY_GENERATION_FINISHED'

export type Story = {
    title: string;
    story: string;
    mood: string;
    setting: string;
    type: string;
    chapterIndexStart: number;
}

export type DreamJournal = {
    id: string;
    name?: string;
    lastUpdated: Date;
    lastState: State;
    messageList: Message[];
    story: Story;
    imageUrl: string
    shared?: boolean
};
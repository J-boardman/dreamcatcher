import type { Message } from "ai";

export type State =
    | 'INTERPRETING'
    | 'CONVERSATION_OVER'
    | 'GENERATING_CHAPTER_STORY'
    | 'FINALISING_STORY'
    | 'STORY_PUBLISHED'

export type Story = {
    title: string;
    story: string;
    mood: string;
    setting: string;
    type: string;
    chapterIndexStart: number;
}

export type JournalImage = {
    url: string,
    created: string,
}

export type DreamJournal = {
    id: string;
    name?: string;
    lastUpdated: Date;
    lastState: State;
    messageList: Message[];
    story: Story;
    image: JournalImage
    shared?: boolean
    finalImageUrl: string;
};
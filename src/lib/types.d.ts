import type { Message } from "ai";
import type { UserResource } from "@clerk/typess"

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
    created?: Date
    lastUpdated: Date;
    lastState: State;
    messageList: Message[];
    story: Story;
    image: JournalImage
    shared?: boolean
    finalImageUrl: string;
};

export type UserResource = UserResource
import type { Message } from "ai";
import type { UserResource } from "@clerk/typess"
import type { Story } from "./db/schema/stories";

export type State =
    | 'INTERPRETING'
    | 'CONVERSATION_OVER'
    | 'GENERATING_CHAPTER_STORY'
    | 'FINALISING_STORY'
    | 'STORY_PUBLISHED'

export type JournalStory = {
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
    story: JournalStory;
    image: JournalImage
    shared?: boolean
    finalImageUrl: string;
};

export interface StoryWithAuthor extends Partial<Story> {
    author: Partial<User>
}

export type UserResource = UserResource
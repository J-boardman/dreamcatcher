import { writable, type Writable } from "svelte/store";
import { storyTemplate } from "./prompts/prompts";
import cover from "$lib/assets/cover.jpg"
import logo from "$lib/assets/logo.png"
import type { Message } from "ai";
import type { DreamJournal } from "./journals";

export let pageTitle = writable("");
export let headerImage = writable({ src: logo, rounded: false })

export let profileTitle = writable('');
export let profileImage = writable('');


export let currentStory = writable({
    title: '',
    mood: '',
    setting: '',
    type: '',
    story: storyTemplate,
    imageUrl: cover,
    chapterIndexStart: 0
    // story: ""
})

export const currentJournalID = writable("");

export const dreamJournals: Writable<DreamJournal[]> = writable([])

export type State =
    | 'INTERPRETING'
    | 'CONVERSATION_OVER'
    | 'GENERATING_CHAPTER_STORY'
    | 'STORY_GENERATION_FINISHED'
    | 'FINALISING_STORY'
    | 'GENERATING_IMAGE';

export let state: Writable<State> = writable()
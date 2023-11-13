import { writable } from "svelte/store";
import { storyTemplate } from "./prompts/prompts";
import cover from "$lib/assets/cover.jpg"
import type { Writable } from "svelte/store";

export let pageTitle = writable("");


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
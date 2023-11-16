import { writable, type Writable } from "svelte/store";
import logo from "$lib/assets/logo.png"

export let pageTitle = writable("");
export let headerImage = writable({ src: logo, rounded: false })

export let profileTitle = writable('');
export let profileImage = writable('');

export type State =
    | 'INTERPRETING'
    | 'CONVERSATION_OVER'
    | 'GENERATING_CHAPTER_STORY'
    | 'STORY_GENERATION_FINISHED'
    | 'FINALISING_STORY'
    | 'GENERATING_IMAGE';

export let state: Writable<State> = writable()
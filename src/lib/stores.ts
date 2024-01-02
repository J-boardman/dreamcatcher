import { writable, type Writable } from "svelte/store";
import logo from "$lib/assets/logo.png?enhanced"
import type { DreamJournal, State, StoryWithAuthor } from "./types";

export let pageTitle = writable("");
export let headerImage = writable({ src: `${logo}`, rounded: false })

export let profileTitle = writable('');
export let profileImage = writable('');

export let state: Writable<State> = writable()
export const journal: Writable<DreamJournal> = writable();

export let newsFeedStories: Writable<StoryWithAuthor[]> = writable([]);

export let grids: Writable<number> = writable(3)

export let fetching: Writable<boolean> = writable(false)
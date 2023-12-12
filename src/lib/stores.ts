import { writable, type Writable } from "svelte/store";
import logo from "$lib/assets/logo.png?enhanced"
import type { DreamJournal, State } from "./types";


export let pageTitle = writable("");
export let headerImage = writable({ src: `${logo}`, rounded: false })

export let profileTitle = writable('');
export let profileImage = writable('');

export let state: Writable<State> = writable()
export const journal: Writable<DreamJournal> = writable();

// place files you want to import through the `$lib` alias in this folder.
import { createJournal, setJournal, updateJournal, removeJournal, saveJournal, loadJournal, getCurrentJournal } from "./helpers/journal"
import { systemMessage } from "./helpers/systemMessage"
import { handleFetch } from "./helpers/handleFetch"
import { handleChatRequest } from "./helpers/handleChatRequest"
import { generateImagePrompt } from "./helpers/generateImagePrompt"
import type { UseChatHelpers } from "ai/svelte/dist";
import { getContext } from "svelte";
import { headerImage } from "./stores";
import logo from "$lib/assets/logo.png?enhanced"

// Journal exports
export {
    createJournal,
    updateJournal,
    saveJournal,
    removeJournal,
    loadJournal,
    getCurrentJournal,
    setJournal,

}

export {
    systemMessage,
    handleFetch,
    handleChatRequest,
    generateImagePrompt
}

export const getChatContext = () => getContext('chat') as UseChatHelpers;

export const randomID = () => Math.random().toString(36).substring(2, 9);

export const resetHeaderImage = () => headerImage.set({ src: logo, rounded: false });

export const wait = async(ms: number) => new Promise(resolve => setTimeout(resolve, ms));
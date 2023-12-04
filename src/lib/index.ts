// place files you want to import through the `$lib` alias in this folder.
import { createJournal, setJournal, updateJournal, removeJournal, saveJournal, loadJournal, getCurrentJournal, handleNewStory } from "./helpers/journal"
import { wait } from "./helpers/wait"
import resetHeaderImage from "./helpers/resetHeaderImage"
import { randomID } from "./helpers/randomID"
import { getChatContext } from "./helpers/getChatContext"
import { systemMessage } from "./helpers/systemMessage"
import { handleFetch } from "./helpers/handleFetch"
import { handleChatRequest } from "./helpers/handleChatRequest"
import { generateImagePrompt } from "./helpers/generateImagePrompt"

// Journal exports
export {
    createJournal,
    updateJournal,
    saveJournal,
    removeJournal,
    loadJournal,
    getCurrentJournal,
    setJournal,
    handleNewStory

}

export {
    wait,
    resetHeaderImage,
    randomID,
    getChatContext,
    systemMessage,
    handleFetch,
    handleChatRequest,
    generateImagePrompt
}
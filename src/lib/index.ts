// place files you want to import through the `$lib` alias in this folder.
import { createJournal, setJournal, updateJournal, removeJournal, saveJournal, loadJournal, getCurrentJournal } from "./helpers/journal"
import { wait } from "./helpers/wait"
import resetHeaderImage from "./helpers/resetHeaderImage"
import { randomID } from "./helpers/randomID"
import { getChatContext } from "./helpers/getChatContext"
import { systemMessage } from "./helpers/appendSystemMessage"
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
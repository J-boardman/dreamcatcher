import { get } from "svelte/store";
import { journal } from "../stores";
import type { DreamJournal } from "../types";
import { page } from "$app/stores";
import { randomID } from "$lib";
import { goto } from "$app/navigation";

export function createJournal(name?: string, id?: string) {
    const newConversation: DreamJournal = {
        id: id || randomID(),
        lastState: 'INTERPRETING',
        created: new Date(),
        lastUpdated: new Date(),
        messageList: [{ role: "system", name: "hidden message", id: "00", content: "" }],
        name: name || "Dream Journal",
        story: { title: "", story: "", mood: "", setting: "", type: "", chapterIndexStart: 0 },
        image: { url: "", created: "" },
        finalImageUrl: ""

    };
    saveNewJournal(newConversation)
    return newConversation;
}

export function getCurrentJournal() {
    const id = get(page).data?.id;
    const journals = loadJournal();
    return journals?.find(item => item.id == id);
}


export function setJournal() {
    const foundConversation = getCurrentJournal();
    if (foundConversation) {
        journal.set(foundConversation);
        removeRedundantMessages();
    }
    else {
        const newConversation = createJournal("My dream Journal", get(page).data?.id)
        journal.set(newConversation);
        saveJournal()
    }
}

export function updateJournal(updatedItem: Partial<DreamJournal>,) {
    journal.update(prev => ({ ...prev, ...updatedItem }))
    saveJournal()
}

export function removeJournal(id?: string) {
    let removingID = id || get(journal).id
    const journalList = loadJournal();
    if (!localStorage || !journalList?.length || !removingID) return;
    const newJournalList = journalList.filter(item => item.id != removingID)
    localStorage.setItem('journals', JSON.stringify(newJournalList))
}

export function saveJournal() {
    const journalList = loadJournal()
    if (!localStorage || !journalList) return;
    const updatedJournalList = journalList?.map(item => item.id == get(journal).id ? get(journal) : item)
    localStorage.setItem('journals', JSON.stringify(updatedJournalList));
}

export function saveNewJournal(conversation: DreamJournal) {
    const journalList = loadJournal()
    if (!localStorage) return;
    const newJournalList = journalList?.length ? [...journalList, conversation] : [conversation]
    localStorage.setItem("journals", JSON.stringify(newJournalList))
}

export function loadJournal(): DreamJournal[] | undefined {
    if (!localStorage) return;
    return JSON.parse(localStorage.getItem("journals") || "[]")
}


function removeRedundantMessages() {
    const filteredMessages = get(journal).messageList.filter((item) => {
        if (item.name == 'Cover Image update' || !item.content) return false;
        return true;
    });
    updateJournal({ messageList: filteredMessages })
}


export function storyPublished(id: string) {
    const journalList = loadJournal()
    if (!localStorage || !journalList) return;
    const updatedJournalList = journalList?.map(item => item.id == get(journal).id ? {...get(journal), id} : item)
    localStorage.setItem('journals', JSON.stringify(updatedJournalList));
}

export function handleNewJournal() {
    const newStory = createJournal();
    goto(`/journal/${newStory.id}`);
}

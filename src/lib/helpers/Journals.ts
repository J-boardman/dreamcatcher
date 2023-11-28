import { get } from "svelte/store";
import { journal, state } from "../stores";
import type { DreamJournal, State, Story } from "../types";
import { randomID } from "$lib";

export function create(name?: string, id?: string) {
    const newConversation: DreamJournal = {
        id: id || randomID(),
        lastState: 'INTERPRETING',
        lastUpdated: new Date(),
        messageList: [{ role: "system", name: "hidden message", id: "00", content: "" }],
        name: name || "Dream Journal " + randomID(),
        story: { title: "", story: "", mood: "", setting: "", type: "", chapterIndexStart: 0 },
        imageUrl: ""
    };
    saveNewConversation(newConversation)
    return newConversation;
}

export function update(updatedItem: Partial<DreamJournal>, saving?: boolean) {
    journal.update(prev => ({ ...prev, ...updatedItem }))
    if (saving) save()
}

export function updateStory(updatedItem: Partial<Story>, saving?: boolean) {
    journal.update(prev => ({ ...prev, story: { ...prev.story, ...updatedItem } }))
    if (saving) save();
}

export function remove(id?: string) {
    let removingID = id || get(journal).id
    const journalList = load();
    if (!localStorage || !journalList?.length || !removingID) return;
    const newJournalList = journalList.filter(item => item.id != removingID)
    localStorage.setItem('journals', JSON.stringify(newJournalList))
}

export function save() {
    const journalList = load()
    if (!localStorage || !journalList) return;
    const updatedJournalList = journalList?.map(item => item.id == get(journal).id ? get(journal) : item)
    localStorage.setItem('journals', JSON.stringify(updatedJournalList));
}

export function saveNewConversation(conversation: DreamJournal) {
    const journalList = load()
    if (!localStorage) return;
    const newJournalList = journalList?.length ? [...journalList, conversation] : [conversation]
    localStorage.setItem("journals", JSON.stringify(newJournalList))
}

export function load(): DreamJournal[] | undefined {
    if (!localStorage) return;
    return JSON.parse(localStorage.getItem("journals") || "[]")
}
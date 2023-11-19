import { get, writable, type Writable } from "svelte/store";
import { state, type State } from "./stores";
import { page } from "$app/stores";
import type { Message } from "ai";
import { goto } from "$app/navigation";

export type Story = {
    title: string;
    story: string;
    imageUrl: string;
    mood: string;
    setting: string;
    type: string;
    chapterIndexStart: number;
}

export type DreamJournal = {
    id: string;
    name?: string;
    lastUpdated: Date;
    lastState: State;
    messageList: Message[];
    story: Story
};


type JournalFactoryFunction = {
    create: (id: string, name?: string) => DreamJournal;
    update: (updatedItem: Partial<DreamJournal>, saving?: boolean) => void;
    updateStory: (updatedItem: Partial<Story>, saving?: boolean) => void;
    updateState: (newState: State, saving?: boolean) => void;
    remove: (id?: string) => void;
    save: () => void;
    load: () => any;
    loadMostRecentConversation: () => string;
}


export const journal: Writable<DreamJournal> = writable();

function JournalFactory(): JournalFactoryFunction {

    function create(id: string, name?: string) {
        const newConversation: DreamJournal = {
            id: id,
            lastState: 'INTERPRETING',
            lastUpdated: new Date(),
            messageList: [{ role: "system", name: "hidden message", id: "00", content: "" }],
            name: name || "Dream Journal " + Math.random().toString(36).substring(0, 3),
            story: { title: "", story: "", mood: "", setting: "", imageUrl: "", type: "", chapterIndexStart: 0 }
        };
        saveNewConversation(newConversation)
        return newConversation;
    }

    function update(updatedItem: Partial<DreamJournal>, saving?: boolean) {
        journal.update(prev => ({ ...prev, ...updatedItem }))
        if (saving) save()
    }

    function updateStory(updatedItem: Partial<Story>, saving?: boolean) {
        journal.update(prev => ({ ...prev, story: { ...prev.story, ...updatedItem }}))
        if (saving) save();
    }

    function updateState(newState: State, saving?: boolean) {
        journal.update(prev => ({...prev, lastState: newState}))
        if (saving) save();
        state.set(newState)
    }

    function remove(id?: string) {
        let removingID = id || get(journal).id
        const journalList = load();
        if (!localStorage || !journalList?.length || !removingID) return;
        const newJournalList = journalList.filter(item => item.id != removingID)
        localStorage.setItem('journals', JSON.stringify(newJournalList))
    }

    function save() {
        const journalList = load()
        if (!localStorage || !journalList) return;
        const updatedJournalList = journalList?.map(item => item.id == get(journal).id ? get(journal) : item)
        localStorage.setItem('journals', JSON.stringify(updatedJournalList));
    }

    function saveNewConversation(conversation: DreamJournal) {
        const journalList = load()
        if(!localStorage) return;
        const newJournalList = journalList?.length ? [...journalList, conversation] : [conversation]
        localStorage.setItem("journals", JSON.stringify(newJournalList))
    }

    function load(): DreamJournal[] | undefined {
        if (!localStorage) return;
        return JSON.parse(localStorage.getItem("journals") || "[]")
    }

    function loadMostRecentConversation() {
        return localStorage.getItem("latestConversation")
    }

    return {
        create,
        update,
        updateStory,
        updateState,
        remove,
        load,
        save,
        loadMostRecentConversation,
    }

}

export const Journal = JournalFactory();
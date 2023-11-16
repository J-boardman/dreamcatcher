import { get, writable, type Writable } from "svelte/store";
import type { State } from "./stores";
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
    all: Writable<DreamJournal[]>;
    current: Writable<DreamJournal>
    create: (name?: string) => DreamJournal;
    update: (updatedItem: Partial<DreamJournal>, saving?: boolean) => void;
    updateStory: (updatedItem: Partial<Story>, saving?: boolean) => void;
    remove: () => void;
    save: () => void;
    load: () => any;
    loadMostRecentConversation: () => void;
    refresh: () => void;
    init: () => void;
}


export const allJournals: Writable<DreamJournal[]> = writable([])
export const currentJournal: Writable<DreamJournal> = writable();

function JournalFactory(): JournalFactoryFunction {

    function create(name?: string) {
        const newConversation: DreamJournal = {
            id: Math.random().toString(36).substring(2, 9),
            lastState: 'INTERPRETING',
            lastUpdated: new Date(),
            messageList: [{ role: "system", name: "message", id: "00", content: "" }],
            name,
            story: { title: "", story: "", mood: "", setting: "", imageUrl: "", type: "", chapterIndexStart: 0 }
        };
        allJournals.update((prev) => [...prev, newConversation]);
        return newConversation;
    }

    function update(updatedItem: Partial<DreamJournal>, saving?: boolean) {
        allJournals.update((prev) =>
            prev.map((item) => (item.id == get(currentJournal).id
                ? { ...item, ...updatedItem }
                : item
            ))
        );
        if (saving) save()
    }

    function updateStory(updatedItem: Partial<Story>, saving?: boolean) {
        allJournals.update((prev) =>
            prev.map(item => item.id == get(currentJournal).id
                ? { ...item, story: { ...item.story, ...updatedItem } }
                : item
            ))
        if (saving) save();
    }


    function remove() {
        allJournals.update(prev => prev.filter(item => item.id != get(currentJournal).id));
    }

    function save() {
        const journalList = get(allJournals)
        if (!localStorage || !journalList.length) return;
        localStorage.setItem('journals', JSON.stringify(journalList));
    }

    function load() {
        if (!localStorage) return;
        allJournals.set(JSON.parse(localStorage.getItem("journals") || "[]"))
    }


    function refresh(): void {
        const currentID = get(page).url.searchParams.get("conversation") || ""
        const refreshedJournal = get(allJournals).find(item => item.id == currentID)
        if (refreshedJournal) {
            currentJournal.set(refreshedJournal)
            saveMostRecentConversation(refreshedJournal.id)
            console.log("saved")
        }
        else {
            const id = loadMostRecentConversation()
            goto(`/journal?conversation=${id}`)
        }

    }

    function saveMostRecentConversation(id: string) {
        localStorage.setItem("latestConversation", id)
    }

    function loadMostRecentConversation() {
        const id = localStorage.getItem("latestConversation") || get(allJournals)[0].id
        return id

    }


    function init() {
        load()
        refresh()
    }

    return {
        all: allJournals, current: currentJournal, create, update, updateStory, remove, load, loadMostRecentConversation, save, refresh, init
    }

}

export const Journal = JournalFactory();
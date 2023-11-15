import { get } from "svelte/store";
import { dreamJournals, currentJournalID, type State, state } from "./stores";
import { dreamInterpretatorPrompt } from "./prompts/prompts";
import { page } from "$app/stores";
import type { Message } from "ai";

export type DreamJournal = {
    id: string;
    name?: string;
    lastUpdated: Date;
    lastState: State;
    messageList: Message[];
    story?: string
    imageUrl?: string
    title?: string
};

type JournalFactory = {
    getCurrentID: () => string;
    getByID: (id: string) => DreamJournal | undefined;
    getCurrentState: () => State | undefined;
    refreshID: () => void;
    updateByID: (id: string, updatedItem: Partial<DreamJournal>) => void;
    create: (name?: string) => DreamJournal;
    deleteByID: (id: string) => void;
    save: () => void;
    load: () => any;
    matchState: () => void;
}

function dreamJournalFactory(): JournalFactory {
    /** 
     * Gets the current page's "conversation" url search params.
     * @returns {string} The current search param value or an empty string.
    */
    function getCurrentID(): string {
        return get(page).url.searchParams.get("conversation") || ""
    }

    function getByID(id: string) {
        const journalList = get(dreamJournals)
        return journalList.find(item => item.id == id)
    }

    function getCurrentState() {
        const journalList = get(dreamJournals)
        return journalList.find(item => item.id == getCurrentID())?.lastState
    }

    /**
     * Sets the current conversation ID store with the value from the url search params.
     * @returns {void}
     */
    function refreshID(): void {
        const newID = getCurrentID();
        currentJournalID.set(newID);
    }

    function updateByID(id: string, updatedItem: Partial<DreamJournal>) {
        dreamJournals.update((prev) =>
            prev.map((item) => (item.id == id ? { ...item, ...updatedItem } : item))
        );
        save();
    }

    function create(name?: string) {
        const newConversation: DreamJournal = {
            name: name,
            id: Math.random().toString(36).substring(2, 9),
            lastState: 'INTERPRETING',
            lastUpdated: new Date(),
            messageList: [
                {
                    role: 'assistant',
                    id: Math.random().toString(36).substring(2, 9),
                    content: dreamInterpretatorPrompt
                }
            ],
        };
        dreamJournals.update((prev) => [...prev, newConversation]);
        save();
        return newConversation;
    }

    function deleteByID(id: string) {
        dreamJournals.update((prev) => prev.filter((item) => item.id != id));
        save()
    }

    function save() {
        const journalList = get(dreamJournals)
        if (!localStorage) return;
        localStorage.setItem('journals', JSON.stringify(journalList));
    }

    function load() {
        return JSON.parse(localStorage.getItem("journals") || "[]")
    }


    function matchState() {
        const currentConversation = journal.getByID(getCurrentID());
        if (!currentConversation) return;
        state.set(currentConversation?.lastState);
    }

    return {
        getCurrentID,
        getByID,
        getCurrentState,
        refreshID,
        updateByID,
        create,
        deleteByID,
        save,
        load,
        matchState
    }
}

export const journal = dreamJournalFactory();
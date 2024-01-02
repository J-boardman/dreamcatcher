import { g as get_store_value } from "./lifecycle.js";
import { j as journal } from "./stores.js";
import { p as page } from "./stores2.js";
import { a as randomID } from "./index2.js";
import { g as goto } from "./navigation.js";
function createJournal(name, id) {
  const newConversation = {
    id: id || randomID(),
    lastState: "INTERPRETING",
    created: /* @__PURE__ */ new Date(),
    lastUpdated: /* @__PURE__ */ new Date(),
    messageList: [{ role: "system", name: "hidden message", id: "00", content: "" }],
    name: name || "Dream Journal",
    story: { title: "", story: "Story Type", mood: "", setting: "", type: "", chapterIndexStart: 0 },
    image: { url: "", created: "" },
    finalImageUrl: ""
  };
  saveNewJournal(newConversation);
  return newConversation;
}
function getCurrentJournal() {
  const id = get_store_value(page).data?.id;
  const journals = loadJournal();
  return journals?.find((item) => item.id == id);
}
function setJournal() {
  const foundConversation = getCurrentJournal();
  if (foundConversation) {
    journal.set(foundConversation);
    removeRedundantMessages();
  } else {
    const newConversation = createJournal("My dream Journal", get_store_value(page).data?.id);
    journal.set(newConversation);
    saveJournal();
  }
}
function updateJournal(updatedItem) {
  journal.update((prev) => ({ ...prev, ...updatedItem }));
  saveJournal();
}
function removeJournal(id) {
  let removingID = id || get_store_value(journal).id;
  const journalList = loadJournal();
  if (!localStorage || !journalList?.length || !removingID)
    return;
  const newJournalList = journalList.filter((item) => item.id != removingID);
  localStorage.setItem("journals", JSON.stringify(newJournalList));
}
function saveJournal() {
  const journalList = loadJournal();
  if (!localStorage || !journalList)
    return;
  const updatedJournalList = journalList?.map((item) => item.id == get_store_value(journal).id ? get_store_value(journal) : item);
  localStorage.setItem("journals", JSON.stringify(updatedJournalList));
}
function saveNewJournal(conversation) {
  const journalList = loadJournal();
  if (!localStorage)
    return;
  const newJournalList = journalList?.length ? [...journalList, conversation] : [conversation];
  localStorage.setItem("journals", JSON.stringify(newJournalList));
}
function loadJournal() {
  if (!localStorage)
    return;
  return JSON.parse(localStorage.getItem("journals") || "[]");
}
function removeRedundantMessages() {
  const filteredMessages = get_store_value(journal).messageList.filter((item) => {
    if (item.name == "Cover Image update" || !item.content)
      return false;
    return true;
  });
  updateJournal({ messageList: filteredMessages });
}
function handleNewJournal() {
  const newStory = createJournal();
  goto(`/journal/${newStory.id}`);
}
export {
  createJournal as c,
  handleNewJournal as h,
  removeJournal as r,
  setJournal as s,
  updateJournal as u
};

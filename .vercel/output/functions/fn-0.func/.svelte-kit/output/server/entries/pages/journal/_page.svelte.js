import { c as create_ssr_component, b as add_attribute, v as validate_component, a as escape, d as each } from "../../../chunks/ssr.js";
import { g as goto, a as afterNavigate } from "../../../chunks/navigation.js";
import { c as createJournal, r as removeJournal } from "../../../chunks/journal.js";
import { C as CldImage } from "../../../chunks/CldImage.js";
import { T as Title } from "../../../chunks/Title.js";
import { I as ImagePlaceholder, B as BottomActions } from "../../../chunks/BottomActions.js";
import { C as Create } from "../../../chunks/create.js";
const JournalCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { journal } = $$props;
  let { handleDelete } = $$props;
  let element;
  if ($$props.journal === void 0 && $$bindings.journal && journal !== void 0)
    $$bindings.journal(journal);
  if ($$props.handleDelete === void 0 && $$bindings.handleDelete && handleDelete !== void 0)
    $$bindings.handleDelete(handleDelete);
  return `<div class="card card-compact card-side bg-secondary-content shadow-xl duration-300"${add_attribute("this", element, 0)}><div class="h-full card-body flex flex-col">${validate_component(Title, "Title").$$render(
    $$result,
    {
      title: journal.story.title || journal.name || "No Title Yet",
      fontSize: "text-xl md:text-2xl"
    },
    {},
    {}
  )} <div class="flex items-center gap-3 mt-auto"><div class="avatar"><div class="mask mask-squircle w-24 h-24">${journal.finalImageUrl ? `${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      src: journal.finalImageUrl,
      width: 400,
      height: 600
    },
    {},
    {}
  )}` : `${journal?.image?.url ? `<img${add_attribute("src", journal?.image?.url, 0)} alt="cover">` : `${validate_component(ImagePlaceholder, "ImagePlaceholder").$$render($$result, { message: "No image" }, {}, {})}`}`}</div></div> <div class="grid gap-3"><div class="md:text-lg opacity-50"><p>Last updated: ${escape(Intl.DateTimeFormat("en-au", { dateStyle: "long" }).format(new Date(journal?.lastUpdated)))}</p> ${journal?.created ? `<p>Created: ${escape(Intl.DateTimeFormat("en-au", { dateStyle: "long" }).format(new Date(journal?.created)))}</p>` : ``}</div> <div class="flex gap-3"><a href="${"/journal/" + escape(journal.id, true)}" class="btn btn-secondary btn-sm">Continue</a> <button class="btn btn-error btn-outline btn-sm" data-svelte-h="svelte-1fbs9x7">Delete</button></div></div></div> <div class="card-actions justify-end"></div></div></div>`;
});
const NewJournalButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { hideTextOnMobile = false } = $$props;
  function handleNewStory() {
    const newStory = createJournal();
    goto(`/journal/${newStory.id}`);
  }
  if ($$props.hideTextOnMobile === void 0 && $$bindings.hideTextOnMobile && hideTextOnMobile !== void 0)
    $$bindings.hideTextOnMobile(hideTextOnMobile);
  if ($$props.handleNewStory === void 0 && $$bindings.handleNewStory && handleNewStory !== void 0)
    $$bindings.handleNewStory(handleNewStory);
  return `<button class="btn btn-ghost join-item h-full"><div class="flex flex-col md:flex-row gap-1 items-center justify-center">${validate_component(Create, "CreateIcon").$$render($$result, { class: "text-xl" }, {}, {})} <span class="${"text-xs sm:text-sm " + escape(hideTextOnMobile ? "hidden md:flex" : "", true)}">New Journal</span></div></button>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let allJournals = [];
  afterNavigate(() => {
    allJournals = JSON.parse(localStorage?.getItem("journals") || "[]");
  });
  async function handleDelete(id) {
    removeJournal(id);
    allJournals = allJournals.filter((item) => item.id != id);
  }
  let newDreamName = "";
  return `<section class="m-2 md:mx-4"><section class="grid auto-rows-max sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16 md:mb-0">${each([...allJournals], (journal, i) => {
    return `${validate_component(JournalCard, "JournalCard").$$render($$result, { journal, handleDelete }, {}, {})}`;
  })}</section></section> ${validate_component(BottomActions, "BottomActions").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="bg-base-200 flex"><input type="text" class="input join-item flex-1 md:flex-none w-60 md:w-fit" placeholder="New Journal Name"${add_attribute("value", newDreamName, 0)}> ${validate_component(NewJournalButton, "NewJournalButton").$$render($$result, { hideTextOnMobile: true }, {}, {})}</div>`;
    }
  })}`;
});
export {
  Page as default
};

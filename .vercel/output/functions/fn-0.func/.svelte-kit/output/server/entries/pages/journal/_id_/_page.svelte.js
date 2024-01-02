import { s as subscribe, k as set_store_value } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, s as spread, e as escape_object, a as escape, b as add_attribute, v as validate_component, d as each, m as missing_component } from "../../../../chunks/ssr.js";
import { j as journal, s as state, f as fetching } from "../../../../chunks/stores.js";
import { a as afterNavigate } from "../../../../chunks/navigation.js";
import { I as ImagePlaceholder, B as BottomActions } from "../../../../chunks/BottomActions.js";
import { M as Modal } from "../../../../chunks/Modal.js";
import { g as getChatContext } from "../../../../chunks/index2.js";
import { c as clerk } from "../../../../chunks/index3.js";
import { u as updateJournal, s as setJournal } from "../../../../chunks/journal.js";
import { T as Title } from "../../../../chunks/Title.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Info = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.712T12 7q-.425 0-.712.288T11 8q0 .425.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22"/>`}<!-- HTML_TAG_END --></svg>`;
});
const ChatImage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let timeRemaining;
  let $$unsubscribe_messages;
  let $journal, $$unsubscribe_journal;
  $$unsubscribe_journal = subscribe(journal, (value) => $journal = value);
  let { message } = $$props;
  const { setMessages, messages } = getChatContext();
  $$unsubscribe_messages = subscribe(messages, (value) => value);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  timeRemaining = "0:00";
  $$unsubscribe_messages();
  $$unsubscribe_journal();
  return `<article class="chat chat-start">${message.content ? `<figure class="${"chat-bubble py-4 " + escape(
    message.content == $journal?.image?.url ? "bg-secondary" : "bg-base-300",
    true
  )}">${message.content == "Generating Image" ? `<div class="w-64 h-96 rounded-t-xl bg-base-200 skeleton"></div>` : `<button><img${add_attribute("src", message.content, 0)} alt="cover" class="w-96 rounded-t-xl"></button>`} <div class="flex items-center justify-between p-2 bg-secondary-content rounded-b-xl -mt-2">${message.content == "Generating Image" ? `<p data-svelte-h="svelte-115f7le">Generating your image</p>` : `<p>${escape(timeRemaining)} until your image expires.</p>`} ${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      buttonText: "",
      classes: "btn-ghost btn-sm btn-circle"
    },
    {},
    {
      title: () => {
        return `<h2 slot="title" class="text-3xl" data-svelte-h="svelte-7s6nc5">About Image Generation</h2>`;
      },
      logo: () => {
        return `${validate_component(Info, "InfoIcon").$$render($$result, { class: "text-2xl text-primary" }, {}, {})} `;
      },
      default: () => {
        return `<p data-svelte-h="svelte-9d8l4z">Images are generated from Open AI&#39;s DALLE-3 image generation model.</p>`;
      }
    }
  )}</div></figure>` : `<div class="w-64 md:w-96 chat-bubble bg-base-300">${validate_component(ImagePlaceholder, "ImagePlaceholder").$$render($$result, { message: "image expired." }, {}, {})}</div>`}</article>`;
});
const Moon_loop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g fill="currentColor" fill-opacity="0"><path d="m15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z"><animate id="lineMdMoonLoop0" fill="freeze" attributeName="fill-opacity" begin="0.7s;lineMdMoonLoop0.begin+6s" dur="0.4s" values="0;1"/><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+2.2s" dur="0.4s" values="1;0"/></path><path d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+3s" dur="0.4s" values="0;1"/><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+5.2s" dur="0.4s" values="1;0"/></path><path d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+0.4s" dur="0.4s" values="0;1"/><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+2.8s" dur="0.4s" values="1;0"/></path><path d="m20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z"><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+3.4s" dur="0.4s" values="0;1"/><animate fill="freeze" attributeName="fill-opacity" begin="lineMdMoonLoop0.begin+5.6s" dur="0.4s" values="1;0"/></path></g><path fill="none" stroke="currentColor" stroke-dasharray="56" stroke-dashoffset="56" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="56;0"/></path>`}<!-- HTML_TAG_END --></svg>`;
});
function formatDate(date) {
  try {
    return Intl.DateTimeFormat("en-au", { dateStyle: "long" }).format(date);
  } catch (error) {
    return "";
  }
}
const ChatBox = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userName;
  let $journal, $$unsubscribe_journal;
  let $clerk, $$unsubscribe_clerk;
  let $messages, $$unsubscribe_messages;
  $$unsubscribe_journal = subscribe(journal, (value) => $journal = value);
  $$unsubscribe_clerk = subscribe(clerk, (value) => $clerk = value);
  let element;
  const { messages } = getChatContext();
  $$unsubscribe_messages = subscribe(messages, (value) => $messages = value);
  afterNavigate(() => {
    updateJournal({
      messageList: $journal.messageList.filter((item) => item.name != "Cover Image updated")
    });
  });
  userName = $clerk?.user?.firstName || "@" + $clerk?.user?.username || "You";
  $$unsubscribe_journal();
  $$unsubscribe_clerk();
  $$unsubscribe_messages();
  return `<section class="border-2 rounded-lg border-base-100 flex min-h-[220px] flex-1 flex-col justify-end text-sm md:text-base join-item"><section class="overflow-scroll"${add_attribute("this", element, 0)}>${each($messages, (message, i) => {
    return `${message.role != "system" ? `<article class="${"chat " + escape(
      message.role == "user" ? "chat-end ml-2" : "chat-start mr-2",
      true
    )}"><div class="hidden md:flex chat-image avatar"><div class="w-10 rounded-full flex items-center justify-center">${message.role == "user" ? `<img alt="Tailwind CSS chat bubble component"${add_attribute("src", $clerk?.user?.imageUrl, 0)}>` : `${validate_component(Moon_loop, "MoonIcon").$$render($$result, { class: "text-2xl md:text-3xl ml-2" }, {}, {})}`} </div></div> <div class="chat-bubble bg-base-300 max-w-[90ch]"><div class="flex gap-2 items-center"><p class="font-bold">${escape(message.role == "user" ? userName : "Dreamcatcher")}</p> <time class="text-xs opacity-50">${escape(formatDate(message.createdAt))}</time></div> <div class="divider divider-neutral my-0"></div> ${each(message.content.split("\n"), (paragraph) => {
      return `<p class="my-2">${escape(paragraph)}</p>`;
    })}</div> </article>` : `${message.name == "image" ? `${validate_component(ChatImage, "ChatImage").$$render($$result, { message }, {}, {})}` : `${message.name != "hidden message" ? `<div class="divider mx-2"><span class="opacity-50 uppercase">${escape(message.name)}</span></div>` : ``}`}`}`;
  })}</section></section>`;
});
const JournalChat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $state, $$unsubscribe_state;
  let $messages, $$unsubscribe_messages;
  let $input, $$unsubscribe_input;
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  const { messages, input } = getChatContext();
  $$unsubscribe_messages = subscribe(messages, (value) => $messages = value);
  $$unsubscribe_input = subscribe(input, (value) => $input = value);
  let textInput;
  $$unsubscribe_state();
  $$unsubscribe_messages();
  $$unsubscribe_input();
  return `${$state == "INTERPRETING" || $state == "STORY_PUBLISHED" ? `<textarea class="textarea textarea-xs focus:outline-none focus:border-none text-base join-item resize-none max-h-80 h-16"${add_attribute(
    "placeholder",
    $messages.length == 0 ? "Describe your dream" : "Discuss your dream",
    0
  )}${add_attribute("this", textInput, 0)}>${escape($input || "")}</textarea>` : ``}`;
});
const StoryTypeSettings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $state, $$unsubscribe_state;
  let $isLoading, $$unsubscribe_isLoading;
  let $journal, $$unsubscribe_journal;
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  $$unsubscribe_journal = subscribe(journal, (value) => $journal = value);
  const { isLoading } = getChatContext();
  $$unsubscribe_isLoading = subscribe(isLoading, (value) => $isLoading = value);
  $$unsubscribe_state();
  $$unsubscribe_isLoading();
  $$unsubscribe_journal();
  return `${$state == "CONVERSATION_OVER" ? `<section class="grid grid-cols-2 gap-2 md:gap-4 h-min"><input type="text" placeholder="Mood (Optional)" list="moods" class="input" name="mood" ${$isLoading ? "disabled" : ""}${add_attribute("value", $journal.story.mood, 0)}> <datalist id="moods"><option value="Wholesome" data-svelte-h="svelte-q5wm1n">Wholesome</option><option value="Scary" data-svelte-h="svelte-9l99qq">Scary</option><option value="Funny" data-svelte-h="svelte-7op4ae">Funny</option><option value="Sad" data-svelte-h="svelte-rjb7qi">Sad</option><option value="Mysterious" data-svelte-h="svelte-1kloxrm">Mysterious</option><option value="Fantastical" data-svelte-h="svelte-wtgm42">Fantastical</option><option value="Romantic" data-svelte-h="svelte-1kcoejb">Romantic</option><option value="Gloomy" data-svelte-h="svelte-1d68jjj">Gloomy</option></datalist> <input type="text" placeholder="Setting (Optional)" list="settings" class="input" name="setting" ${$isLoading ? "disabled" : ""}${add_attribute("value", $journal.story.setting, 0)}> <datalist id="settings"><option value="Medieval" data-svelte-h="svelte-1gu9y67">Medieval</option><option value="Futuristic" data-svelte-h="svelte-c06w1w">Futuristic</option><option value="Fantasy" data-svelte-h="svelte-188b67k">Fantasy</option><option value="Historical" data-svelte-h="svelte-2y0vnk">Historical</option><option value="Post Apocalypse" data-svelte-h="svelte-1r1nxkx">Post Apocalypse</option><option value="Magical Realm" data-svelte-h="svelte-1kgvx0x">Magical Realm</option><option value="Mysterious Location" data-svelte-h="svelte-in3zx5">Mysterious Location</option><option value="Outer Space" data-svelte-h="svelte-th025d">Outer Space</option><option value="Secluded Island" data-svelte-h="svelte-ifn2uu">Secluded Island</option><option value="Vast desert" data-svelte-h="svelte-1okmyx3">Vast desert</option><option value="Dense Jungle" data-svelte-h="svelte-1qmlu3g">Dense Jungle</option></datalist></section>` : ``}`;
});
const SaveStoryModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sharing;
  let $journal, $$unsubscribe_journal;
  let $$unsubscribe_clerk;
  let $fetching, $$unsubscribe_fetching;
  $$unsubscribe_journal = subscribe(journal, (value) => $journal = value);
  $$unsubscribe_clerk = subscribe(clerk, (value) => value);
  $$unsubscribe_fetching = subscribe(fetching, (value) => $fetching = value);
  sharing = $journal?.shared;
  $$unsubscribe_journal();
  $$unsubscribe_clerk();
  $$unsubscribe_fetching();
  return `${validate_component(Modal, "Modal").$$render(
    $$result,
    {
      buttonText: "",
      noAnimate: true,
      busy: $fetching || !$journal.story.title
    },
    {},
    {
      title: () => {
        return `<div class="flex items-center gap-3" slot="title"><div class="avatar"><div class="mask mask-squircle w-24 h-24">${$journal?.image?.url ? `<img${add_attribute("src", $journal?.image?.url, 0)} alt="cover">` : `${validate_component(ImagePlaceholder, "ImagePlaceholder").$$render($$result, { message: "" }, {}, {})}`}</div></div> <div><div class="text-lg opacity-50" data-svelte-h="svelte-1quo1eb">Saving the story:</div> ${validate_component(Title, "Title").$$render(
          $$result,
          {
            title: $journal.story.title,
            fontSize: "text-2xl",
            fontColor: "text-success"
          },
          {},
          {}
        )}</div></div>`;
      },
      "button-text": () => {
        return `<span class="hidden md:flex" slot="button-text" data-svelte-h="svelte-1xbbf7o">Save Story</span>`;
      },
      logo: () => {
        return `${validate_component(Icon, "Icon").$$render($$result, { icon: "bi:save", slot: "logo" }, {}, {})}`;
      },
      default: () => {
        return `<section class="gap-2 pb-4 max-w-full"><article class="my-2 max-h-80 overflow-scroll">${each($journal.story.story.split("\n"), (paragraph, i) => {
          return `<p class="py-1">${escape(paragraph)}</p>`;
        })}</article> <div class="divider divider-neutral mt-2"></div> <p class="italic opacity-80" data-svelte-h="svelte-1ik1wgy"><span class="font-bold text-success">Note:</span> Your conversation history with the dream interpreter
			will remain stored on your device only.</p> <div class="flex items-end justify-between"><label for="share" class="flex items-center gap-4 cursor-pointer label"><input type="checkbox" name="share" id="share" class="toggle toggle-success" ${sharing ? "checked" : ""} ${!$journal.story.title || !$journal?.image?.url ? "disabled" : ""}>
				Share story</label> <form method="dialog"><button ${""} class="btn btn-success">Save</button></form></div></section>`;
      }
    }
  )}`;
});
const FinalStory = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $journal, $$unsubscribe_journal;
  let $$unsubscribe_messages;
  let $state, $$unsubscribe_state;
  let $fetching, $$unsubscribe_fetching;
  $$unsubscribe_journal = subscribe(journal, (value) => $journal = value);
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  $$unsubscribe_fetching = subscribe(fetching, (value) => $fetching = value);
  const { messages, setMessages } = getChatContext();
  $$unsubscribe_messages = subscribe(messages, (value) => value);
  $$unsubscribe_journal();
  $$unsubscribe_messages();
  $$unsubscribe_state();
  $$unsubscribe_fetching();
  return `${$state == "FINALISING_STORY" ? `<section class="flex gap-2"><article class="flex rounded-xl"><input type="text" class="join-item input flex-1 max-w-36 md:max-w-full" placeholder="Title" ${$fetching ? "disabled" : ""}${add_attribute("value", $journal.story.title, 0)}> <button ${$fetching ? "disabled" : ""} class="btn animate-none rounded-l-none">${validate_component(Icon, "Icon").$$render($$result, { icon: "charm:refresh", class: "text-lg" }, {}, {})} <span class="hidden md:flex" data-svelte-h="svelte-1jqhjgc">Generate Title</span></button></article> <button ${$fetching ? "disabled" : ""} class="btn animate-none">${validate_component(Icon, "Icon").$$render($$result, { icon: "ph:image", class: "text-lg" }, {}, {})} <span class="hidden md:flex" data-svelte-h="svelte-pzyt9o">New Image</span></button> ${validate_component(SaveStoryModal, "SaveStoryModal").$$render($$result, {}, {}, {})}</section>` : ``}`;
});
const ChapterStoryGenerator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_journal;
  let $$unsubscribe_messages;
  let $state, $$unsubscribe_state;
  let $isLoading, $$unsubscribe_isLoading;
  $$unsubscribe_journal = subscribe(journal, (value) => value);
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  const { isLoading, messages, append } = getChatContext();
  $$unsubscribe_isLoading = subscribe(isLoading, (value) => $isLoading = value);
  $$unsubscribe_messages = subscribe(messages, (value) => value);
  $$unsubscribe_journal();
  $$unsubscribe_messages();
  $$unsubscribe_state();
  $$unsubscribe_isLoading();
  return ` ${$state == "GENERATING_CHAPTER_STORY" ? `<section class="flex gap-2">${each(Array(3), (_, i) => {
    return `<button value="${"option " + escape(i + 1, true)}" ${$isLoading ? "disabled" : ""} class="btn animate-none">${``} ${escape(i + 1)} </button>`;
  })} <button value="Wrap it up" ${$isLoading ? "disabled" : ""} class="btn animate-none">Wrap it up!</button></section>` : ``}`;
});
const InterpretationActions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_journal;
  let $isLoading, $$unsubscribe_isLoading;
  $$unsubscribe_journal = subscribe(journal, (value) => value);
  const { append, isLoading, handleSubmit } = getChatContext();
  $$unsubscribe_isLoading = subscribe(isLoading, (value) => $isLoading = value);
  $$unsubscribe_journal();
  $$unsubscribe_isLoading();
  return `<form class="flex gap-2 mr-2"><button class="btn" ${$isLoading ? "disabled" : ""}>Send
        ${validate_component(Icon, "Icon").$$render($$result, { icon: "carbon:send", class: "text-xl" }, {}, {})}</button> <button type="button" class="btn" ${$isLoading ? "disabled" : ""}>Start Story
		${validate_component(Icon, "Icon").$$render($$result, { icon: "carbon:book", class: "text-xl" }, {}, {})}</button></form>`;
});
const StoryGenerator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $journal, $$unsubscribe_journal;
  let $$unsubscribe_messages;
  let $isLoading, $$unsubscribe_isLoading;
  $$unsubscribe_journal = subscribe(journal, (value) => $journal = value);
  const { messages, isLoading, append } = getChatContext();
  $$unsubscribe_messages = subscribe(messages, (value) => value);
  $$unsubscribe_isLoading = subscribe(isLoading, (value) => $isLoading = value);
  $$unsubscribe_journal();
  $$unsubscribe_messages();
  $$unsubscribe_isLoading();
  return `<section class="flex flex-1 gap-2"><button value="fullStory" class="${[
    "btn flex-1 no-animation",
    $journal.story.type == "fullStory" ? "btn-secondary" : ""
  ].join(" ").trim()}" ${$isLoading ? "disabled" : ""}>Full Story</button> <button value="chapterStory" class="${[
    "btn flex-1 no-animation",
    $journal.story.type == "chapterStory" ? "btn-secondary" : ""
  ].join(" ").trim()}" ${$isLoading ? "disabled" : ""}>Choose your own adventure</button> <button ${!$journal.story.type || $isLoading ? "disabled" : ""} class="btn flex-1 no-animation">Start!</button></section>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $state, $$unsubscribe_state;
  let $journal, $$unsubscribe_journal;
  let $input, $$unsubscribe_input;
  $$unsubscribe_state = subscribe(state, (value) => $state = value);
  $$unsubscribe_journal = subscribe(journal, (value) => $journal = value);
  const { input, messages, setMessages } = getChatContext();
  $$unsubscribe_input = subscribe(input, (value) => $input = value);
  const snapshot = {
    capture: () => $input,
    restore: (value) => set_store_value(input, $input = value, $input)
  };
  afterNavigate(() => {
    setJournal();
    setMessages($journal?.messageList);
    state.set($journal.lastState);
  });
  let component;
  if ($$props.snapshot === void 0 && $$bindings.snapshot && snapshot !== void 0)
    $$bindings.snapshot(snapshot);
  {
    {
      switch ($state) {
        case "INTERPRETING":
          component = InterpretationActions;
          break;
        case "CONVERSATION_OVER":
          component = StoryGenerator;
          break;
        case "FINALISING_STORY":
          component = FinalStory;
          break;
        case "GENERATING_CHAPTER_STORY":
          component = ChapterStoryGenerator;
          break;
      }
    }
  }
  $$unsubscribe_state();
  $$unsubscribe_journal();
  $$unsubscribe_input();
  return `${validate_component(ChatBox, "ChatBox").$$render($$result, {}, {}, {})} ${validate_component(JournalChat, "DreamInterpreter").$$render($$result, {}, {}, {})} ${validate_component(StoryTypeSettings, "StoryGenerator").$$render($$result, {}, {}, {})} ${validate_component(BottomActions, "BottomActions").$$render($$result, { journalPage: true }, {}, {
    default: () => {
      return `${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
export {
  Page as default
};

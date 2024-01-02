import { c as create_ssr_component, s as spread, e as escape_object, a as escape, v as validate_component } from "./ssr.js";
import { a as afterNavigate, g as goto } from "./navigation.js";
import { c as compute_rest_props, s as subscribe } from "./lifecycle.js";
import { c as clerk } from "./index3.js";
import { S as SignedIn } from "./Title.js";
const Image_twotone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path fill="none" stroke-dasharray="66" stroke-dashoffset="66" stroke-width="2" d="M3 14V5H21V19H3V14"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="66;0"/></path><path fill="currentColor" fill-opacity="0" stroke-dasharray="52" stroke-dashoffset="52" d="M3 16L7 13L10 15L16 10L21 14V19H3Z"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.8s" values="52;0"/><animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.15s" values="0;0.3"/></path></g><circle cx="7.5" cy="9.5" r="1.5" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.4s" values="0;1"/></circle>`}<!-- HTML_TAG_END --></svg>`;
});
const ImagePlaceholder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { loading = false } = $$props;
  let { message = "No image yet" } = $$props;
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  return `<div class="${"w-full h-full p-4 flex flex-col justify-center items-center rounded-xl " + escape(loading ? "skeleton" : "", true)}">${validate_component(Image_twotone, "ImageIcon").$$render($$result, { class: "text-5xl" }, {}, {})} <p>${escape(message)}</p></div>`;
});
const Home_md = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="21" stroke-dashoffset="21" d="M5 21H19"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="21;0"/></path><path stroke-dasharray="15" stroke-dashoffset="15" d="M5 21V8M19 21V8"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.2s" dur="0.2s" values="15;0"/></path><path stroke-dasharray="24" stroke-dashoffset="24" d="M9 21V13H15V21"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.4s" values="24;0"/></path><path stroke-dasharray="26" stroke-dashoffset="26" d="M2 10L12 2L22 10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.4s" values="26;0"/></path></g>`}<!-- HTML_TAG_END --></svg>`;
});
const Book = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M3 6a4 4 0 0 1 4-4h14v20H7a4 4 0 0 1-4-4zm2 8.535A3.982 3.982 0 0 1 7 14h12V4H7a2 2 0 0 0-2 2zM19 16H7a2 2 0 1 0 0 4h12zM10 6h7v2h-7z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Grid_3_filled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g fill="currentColor" fill-opacity="0" stroke="currentColor" stroke-dasharray="10" stroke-dashoffset="10" stroke-linecap="round"><g><circle cx="5" cy="5" r="1.5"/><circle cx="12" cy="5" r="1.5"/><circle cx="19" cy="5" r="1.5"/><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="10;0"/><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.5s" values="0;1"/></g><g><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.4s" dur="0.2s" values="10;0"/><animate fill="freeze" attributeName="fill-opacity" begin="1s" dur="0.5s" values="0;1"/></g><g><circle cx="5" cy="19" r="1.5"/><circle cx="12" cy="19" r="1.5"/><circle cx="19" cy="19" r="1.5"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="10;0"/><animate fill="freeze" attributeName="fill-opacity" begin="1.2s" dur="0.5s" values="0;1"/></g></g>`}<!-- HTML_TAG_END --></svg>`;
});
const User_outline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Back_2_fill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092"/><path fill="currentColor" d="M7.16 10.972A7 7 0 0 1 19.5 15.5a1.5 1.5 0 1 0 3 0c0-5.523-4.477-10-10-10a9.973 9.973 0 0 0-7.418 3.295L4.735 6.83a1.5 1.5 0 1 0-2.954.52l1.042 5.91c.069.391.29.74.617.968c.403.282.934.345 1.385.202l5.644-.996a1.5 1.5 0 1 0-.52-2.954l-2.788.491"/></g>`}<!-- HTML_TAG_END --></svg>`;
});
const Log_out = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"><path stroke-dasharray="46" stroke-dashoffset="46" d="M16 5V4C16 3.44772 15.5523 3 15 3H6C5.44771 3 5 3.44772 5 4V20C5 20.5523 5.44772 21 6 21H15C15.5523 21 16 20.5523 16 20V19"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.5s" values="46;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M10 12h11" opacity="0"><set attributeName="opacity" begin="0.6s" to="1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="12;0"/></path><path stroke-dasharray="6" stroke-dashoffset="6" d="M21 12l-3.5 -3.5M21 12l-3.5 3.5" opacity="0"><set attributeName="opacity" begin="0.8s" to="1"/><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="6;0"/></path></g>`}<!-- HTML_TAG_END --></svg>`;
});
const SignOutButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["signOutCallback", "signOutOptions"]);
  let $$unsubscribe_clerk;
  $$unsubscribe_clerk = subscribe(clerk, (value) => value);
  let { signOutCallback = void 0 } = $$props;
  let { signOutOptions = void 0 } = $$props;
  if ($$props.signOutCallback === void 0 && $$bindings.signOutCallback && signOutCallback !== void 0)
    $$bindings.signOutCallback(signOutCallback);
  if ($$props.signOutOptions === void 0 && $$bindings.signOutOptions && signOutOptions !== void 0)
    $$bindings.signOutOptions(signOutOptions);
  $$unsubscribe_clerk();
  return `<button${spread([{ type: "button" }, escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : `Sign Out`}</button>`;
});
const Mail_outline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const MobileNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let previousPage = "";
  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname || previousPage;
  });
  return `${validate_component(SignedIn, "SignedIn").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="size-12 min-w-12 min-h-12 rounded-xl bg-base-200 ml-auto">  <div class="dropdown dropdown-top dropdown-end w-full h-full"><label tabindex="0" class="h-full w-full cursor-pointer grid place-items-center">${validate_component(Grid_3_filled, "GridIcon").$$render($$result, { class: "text-2xl" }, {}, {})}</label>  <ul tabindex="0" class="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box grid grid-cols-2 w-max text-xs mb-2"> <li><a class="flex flex-col" href="/">${validate_component(Home_md, "HomeIcon").$$render($$result, { class: "text-xl" }, {}, {})}<span data-svelte-h="svelte-1i3udvz">Home</span></a></li> <li><a class="flex flex-col" href="/profile">${validate_component(User_outline, "UserIcon").$$render($$result, { class: "text-xl" }, {}, {})}Profile</a></li> <li><a class="flex flex-col" href="/journal">${validate_component(Book, "BookIcon").$$render($$result, { class: "text-xl" }, {}, {})}Journal</a></li> <li><a class="flex flex-col" href="/profile">${validate_component(Mail_outline, "NotificationIcon").$$render($$result, { class: "text-xl" }, {}, {})}Notifications</a></li> <li><button class="flex flex-col">${validate_component(Back_2_fill, "BackIcon").$$render($$result, { class: "text-xl" }, {}, {})}<span data-svelte-h="svelte-bht4nf">Back</span></button></li> <li>${validate_component(SignOutButton, "SignOutButton").$$render(
        $$result,
        {
          signOutCallback: () => goto("/", { invalidateAll: true, replaceState: true }),
          class: "flex flex-col"
        },
        {},
        {
          default: () => {
            return `${validate_component(Log_out, "LogoutIcon").$$render($$result, { class: "text-xl" }, {}, {})} Sign out`;
          }
        }
      )}</li></ul></div></div>`;
    }
  })}`;
});
const BottomActions_svelte_svelte_type_style_lang = "";
const css = {
  code: ".bottom-padding.svelte-g2bjyj{bottom:0.5rem;margin:0 1rem}",
  map: null
};
const BottomActions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { journalPage = false } = $$props;
  if ($$props.journalPage === void 0 && $$bindings.journalPage && journalPage !== void 0)
    $$bindings.journalPage(journalPage);
  $$result.css.add(css);
  return ` <section class="${[
    "flex items-center h-12 md:h-14 z-30 text-xl left-2 rounded-xl sticky bottom-0 gap-2 svelte-g2bjyj",
    !journalPage ? "bottom-padding" : ""
  ].join(" ").trim()}"><section class=">:bg-base-200 join flex-1">${slots.default ? slots.default({}) : ``}</section> ${`${validate_component(MobileNav, "MobileNav").$$render($$result, {}, {}, {})}`} </section>`;
});
export {
  BottomActions as B,
  ImagePlaceholder as I
};

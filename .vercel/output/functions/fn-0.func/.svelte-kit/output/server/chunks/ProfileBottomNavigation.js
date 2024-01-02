import { c as create_ssr_component, a as escape, b as add_attribute, v as validate_component } from "./ssr.js";
import { T as Title } from "./Title.js";
import { s as subscribe } from "./lifecycle.js";
import { B as BottomActions } from "./BottomActions.js";
import { p as page } from "./stores2.js";
let credits = 5;
const AboutSection = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="flex flex-col gap-4"><h2 class="text-2xl" data-svelte-h="svelte-qzkos4">About</h2> <article><h3 class="text-xl">Credits remaining: ${escape(credits)}</h3> <progress class="progress progress-secondary w-56"${add_attribute("value", credits, 0)} max="10"></progress></article></section>`;
});
const ProfileHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `<section class="flex md:hidden py-2 gap-4 items-center sticky top-0 bg-black z-20"><div class="mask mask-squircle w-12 h-12">${user?.imageUrl ? `<img${add_attribute("src", user?.imageUrl, 0)} alt="profile" class="h-full w-full">` : `<div class="h-full w-full skeleton"></div>`}</div> ${user?.username ? `${validate_component(Title, "Title").$$render(
    $$result,
    {
      title: `${user?.username}'s profile`,
      fontSize: user?.username?.length > 15 ? "text-2xl" : "text-3xl"
    },
    {},
    {}
  )}` : `${validate_component(Title, "Title").$$render($$result, { title: "Loading user" }, {}, {})}`}</section>`;
});
const ProfileLayout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `<section class="mb-20 md:mb-0"><section>${validate_component(ProfileHeader, "ProfileHeader").$$render($$result, { user }, {}, {})} <section class="md:m-2">${slots.default ? slots.default({}) : ``}</section></section></section> <div class="hidden md:flex divider divider-horizontal divider-neutral h-full"></div> ${validate_component(AboutSection, "AboutSection").$$render($$result, {}, {}, {})}`;
});
const ProfileBottomNavigation = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filterBy;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let pathname = $page.url.pathname;
  filterBy = $page.url.searchParams.get("filter");
  $$unsubscribe_page();
  return `${validate_component(BottomActions, "BottomActions").$$render($$result, {}, {}, {
    default: () => {
      return `<a class="${"h-full btn join-item " + escape(filterBy == null ? "btn-secondary" : "", true)}"${add_attribute("href", pathname, 0)}>Stories</a> <a class="${"h-full btn join-item " + escape(filterBy == "liked" ? "btn-secondary" : "", true)}" href="${escape(pathname, true) + "?filter=liked"}">Liked Stories</a> ${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
export {
  ProfileLayout as P,
  ProfileBottomNavigation as a
};

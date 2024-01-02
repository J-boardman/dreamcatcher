import { c as create_ssr_component, b as add_attribute, d as each, v as validate_component, a as escape } from "../../../chunks/ssr.js";
import { s as subscribe } from "../../../chunks/lifecycle.js";
import { S as StoryCard } from "../../../chunks/StoryCard.js";
import { a as afterNavigate } from "../../../chunks/navigation.js";
import { p as page } from "../../../chunks/stores2.js";
import { n as newsFeedStories } from "../../../chunks/stores.js";
import { i as isFollowingFeed } from "../../../chunks/index2.js";
import { C as Create } from "../../../chunks/create.js";
import { B as BottomAction } from "../../../chunks/BottomAction.js";
import { B as BottomActions } from "../../../chunks/BottomActions.js";
import { h as handleNewJournal } from "../../../chunks/journal.js";
const IntersectionObserver_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let followingFeed;
  let $newsFeedStories, $$unsubscribe_newsFeedStories;
  let $page, $$unsubscribe_page;
  $$unsubscribe_newsFeedStories = subscribe(newsFeedStories, (value) => $newsFeedStories = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let moreToLoad = true;
  let element;
  afterNavigate(async () => {
    moreToLoad = await checkCount();
  });
  async function checkCount() {
    const data = await fetch("/api/stories/count/" + followingFeed);
    const { storyCount } = await data.json();
    return $newsFeedStories.length < storyCount;
  }
  followingFeed = isFollowingFeed($page.url) ? "?filter=following&" : "?";
  followingFeed + `skip=${$newsFeedStories.length}`;
  $$unsubscribe_newsFeedStories();
  $$unsubscribe_page();
  return `${moreToLoad ? `<div class="w-full h-full bg-secondary-content/80 skeleton"${add_attribute("this", element, 0)}></div> ${each(Array(3), (_) => {
    return `<div class="h-full w-full bg-secondary-content/80 skeleton"></div>`;
  })}` : `<section class="flex justify-center items-center gap-2 text-lg bg-secondary-content/80 rounded-xl"><button class="grid place-items-center duration-200 hover:text-secondary mb-16 py-8 w-full rounded-xl">${validate_component(Create, "CreateIcon").$$render($$result, { class: "text-7xl" }, {}, {})} <p data-svelte-h="svelte-1vbx0y5">No stories left...</p> <p data-svelte-h="svelte-tpeu84">Why not start one of your own?</p></button></section>`}`;
});
const Newsfeed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $newsFeedStories, $$unsubscribe_newsFeedStories;
  $$unsubscribe_newsFeedStories = subscribe(newsFeedStories, (value) => $newsFeedStories = value);
  $$unsubscribe_newsFeedStories();
  return `<section class="my-2 grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">${each($newsFeedStories, (story) => {
    return `<a href="${"/story/" + escape(story?.id, true)}">${validate_component(StoryCard, "StoryCard").$$render($$result, { story }, {}, {})} </a>`;
  })} ${validate_component(IntersectionObserver_1, "IntersectionObserver").$$render($$result, {}, {}, {})}</section>`;
});
const NewsfeedActions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let followingFeed;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  followingFeed = isFollowingFeed($page.url);
  $$unsubscribe_page();
  return `${validate_component(BottomActions, "BottomActions").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(BottomAction, "BottomAction").$$render(
        $$result,
        {
          link: "/feed",
          active: !followingFeed,
          icon: "fluent-mdl2:world"
        },
        {},
        {
          label: () => {
            return `<span slot="label" data-svelte-h="svelte-9jbwhk">Global</span>`;
          }
        }
      )} ${validate_component(BottomAction, "BottomAction").$$render(
        $$result,
        {
          link: "/feed?filter=following",
          active: followingFeed,
          icon: "ph:user-bold"
        },
        {},
        {
          label: () => {
            return `<span slot="label" data-svelte-h="svelte-2yvu6u">Following</span>`;
          }
        }
      )} ${validate_component(BottomAction, "BottomAction").$$render(
        $$result,
        {
          action: handleNewJournal,
          icon: "system-uicons:create"
        },
        {},
        {
          label: () => {
            return `<span slot="label" data-svelte-h="svelte-56mq0o">New Journal</span>`;
          }
        }
      )}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<main class="md:mx-4 mb-16 md:mb-24 flex-1 grid">${validate_component(Newsfeed, "Newsfeed").$$render($$result, {}, {}, {})}</main> ${validate_component(NewsfeedActions, "NewsfeedActions").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};

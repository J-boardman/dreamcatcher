import { s as subscribe } from "../../../chunks/lifecycle.js";
import { c as create_ssr_component, a as escape, b as add_attribute, v as validate_component, d as each } from "../../../chunks/ssr.js";
import { p as pageTitle, a as profileTitle, h as headerImage } from "../../../chunks/stores.js";
import { P as ProfileLayout, a as ProfileBottomNavigation } from "../../../chunks/ProfileBottomNavigation.js";
import { S as StoryCard } from "../../../chunks/StoryCard.js";
import { p as page } from "../../../chunks/stores2.js";
import { M as Modal } from "../../../chunks/Modal.js";
import { a as afterNavigate } from "../../../chunks/navigation.js";
const UserCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { user } = $$props;
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  return `<div class="flex flex-1 items-center space-x-3 "><a href="${"/profile/" + escape(user.id, true)}" class="avatar">${user ? `<div class="mask mask-squircle w-10 h-10"><img${add_attribute("src", user?.imageUrl + "?enhanced", 0)} alt="profile"> <img src="/" alt="Avatar Tailwind CSS Component"></div>` : `<div class="mask mask-squircle w-10 h-10 skeleton"></div>`}</a> <div class="flex flex-col">${user ? `<a href="${"/profile/" + escape(user?.id, true)}" class="">${escape(user?.username)}</a>` : `<div class="font-bold w-[20ch] h-6 skeleton"></div> <div class="text-sm opacity-50 w-[20ch] h-4 skeleton"></div>`}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filter;
  let followerString;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  afterNavigate(() => {
    pageTitle.set(`${data.user?.username}'s profile`);
    profileTitle.set(`${data?.user?.username}`);
    headerImage.set({
      src: `${data.user?.imageUrl}`,
      rounded: true
    });
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  filter = $page.url.searchParams.get("filter");
  followerString = `${data.followerCount} Follower${data.followerCount == 1 ? "" : "s"}`;
  $$unsubscribe_page();
  return `${validate_component(ProfileLayout, "ProfileLayout").$$render($$result, { user: data.user }, {}, {
    default: () => {
      return `<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">${each(data.stories, (story) => {
        return `<a href="${"/story/" + escape(story.id, true)}">${validate_component(StoryCard, "StoryCard").$$render($$result, { story, hideAuthorCard: filter != "liked" }, {}, {})} </a>`;
      })}</section>`;
    }
  })} ${validate_component(ProfileBottomNavigation, "ProfileBottomNavigation").$$render($$result, {}, {}, {
    default: () => {
      return `${data.followers.length ? `${validate_component(Modal, "Modal").$$render(
        $$result,
        {
          buttonText: followerString,
          classes: "h-full rounded-l-none rounded-r-xl"
        },
        {},
        {
          title: () => {
            return `<h2 slot="title" class="text-2xl">${escape(followerString)}</h2>`;
          },
          default: () => {
            return `<article class="grid gap-4">${each(data.followers, (follower) => {
              return `${validate_component(UserCard, "UserCard").$$render($$result, { user: follower }, {}, {})}`;
            })}</article>`;
          }
        }
      )}` : ``}`;
    }
  })}`;
});
export {
  Page as default
};

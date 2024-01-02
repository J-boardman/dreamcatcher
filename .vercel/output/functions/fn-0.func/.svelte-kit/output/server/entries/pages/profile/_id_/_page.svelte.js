import { s as subscribe } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, v as validate_component, d as each, a as escape } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores2.js";
import { P as ProfileLayout, a as ProfileBottomNavigation } from "../../../../chunks/ProfileBottomNavigation.js";
import { S as StoryCard } from "../../../../chunks/StoryCard.js";
import { c as clerk } from "../../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let followerCount;
  let followedByUser;
  let filter;
  let $clerk, $$unsubscribe_clerk;
  let $page, $$unsubscribe_page;
  $$unsubscribe_clerk = subscribe(clerk, (value) => $clerk = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $clerk?.user?.id;
  followerCount = data.followerCount;
  followedByUser = data.followedByUser;
  filter = $page.url.searchParams.get("filter");
  $$unsubscribe_clerk();
  $$unsubscribe_page();
  return `${validate_component(ProfileLayout, "ProfileLayout").$$render(
    $$result,
    {
      user: {
        username: data.username,
        imageUrl: data.imageUrl
      }
    },
    {},
    {
      default: () => {
        return `<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">${each(data.stories, (story) => {
          return `<a href="${"/story/" + escape(story.id, true)}">${validate_component(StoryCard, "StoryCard").$$render($$result, { story, hideAuthorCard: filter != "liked" }, {}, {})} </a>`;
        })}</section>
	Followers: ${escape(followerCount)}`;
      }
    }
  )} ${validate_component(ProfileBottomNavigation, "ProfileBottomNavigation").$$render($$result, {}, {}, {
    default: () => {
      return `<button class="btn join-item h-full">${followedByUser ? `Following` : `Follow`}</button>`;
    }
  })}`;
});
export {
  Page as default
};

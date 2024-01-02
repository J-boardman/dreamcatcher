import { s as subscribe } from "../../../../chunks/lifecycle.js";
import { c as create_ssr_component, s as spread, e as escape_object, a as escape, v as validate_component, b as add_attribute, d as each } from "../../../../chunks/ssr.js";
import { T as Title } from "../../../../chunks/Title.js";
import { I as ImagePlaceholder, B as BottomActions } from "../../../../chunks/BottomActions.js";
import { C as CldImage } from "../../../../chunks/CldImage.js";
import { p as pageTitle } from "../../../../chunks/stores.js";
import { g as goto, a as afterNavigate } from "../../../../chunks/navigation.js";
import { c as clerk } from "../../../../chunks/index3.js";
import { B as BottomAction } from "../../../../chunks/BottomAction.js";
import { I as Icon } from "../../../../chunks/Icon.js";
async function handleFetch(url, options) {
  try {
    const response = await fetch(url, {
      method: options.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(options.body),
      ...options.extras
    });
    return [await response.json(), null];
  } catch (error) {
    return [null, error];
  }
}
const Heart_fill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 256 256" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M240 94c0 70-103.79 126.66-108.21 129a8 8 0 0 1-7.58 0C119.79 220.66 16 164 16 94a62.07 62.07 0 0 1 62-62c20.65 0 38.73 8.88 50 23.89C139.27 40.88 157.35 32 178 32a62.07 62.07 0 0 1 62 62"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Heart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 256 256" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M178 32c-20.65 0-38.73 8.88-50 23.89C116.73 40.88 98.65 32 78 32a62.07 62.07 0 0 0-62 62c0 70 103.79 126.66 108.21 129a8 8 0 0 0 7.58 0C136.21 220.66 240 164 240 94a62.07 62.07 0 0 0-62-62m-50 174.8C109.74 196.16 32 147.69 32 94a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8"/>`}<!-- HTML_TAG_END --></svg>`;
});
const LikeButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { storyID = 0 } = $$props;
  let { liked = false } = $$props;
  let { likes = 0 } = $$props;
  if ($$props.storyID === void 0 && $$bindings.storyID && storyID !== void 0)
    $$bindings.storyID(storyID);
  if ($$props.liked === void 0 && $$bindings.liked && liked !== void 0)
    $$bindings.liked(liked);
  if ($$props.likes === void 0 && $$bindings.likes && likes !== void 0)
    $$bindings.likes(likes);
  return `<button class="${"flex gap-1 h-full join-item btn font-bold items-center duration-200 md:hover:text-primary " + escape(liked ? "text-primary" : "text-white", true)}">${liked ? `${validate_component(Heart_fill, "HeartIconFilled").$$render($$result, { class: "text-2xl " }, {}, {})}` : `${validate_component(Heart, "HeartIconOutline").$$render($$result, { class: "text-2xl" }, {}, {})}`} ${escape(likes)}</button>`;
});
const AuthorControls = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let API_URL;
  let { story } = $$props;
  let { id, shared } = story;
  let deleting = false;
  let confirmingDelete = false;
  async function handleShareClick() {
    const [result, error] = await handleFetch(API_URL, {
      method: "PATCH",
      body: { shared: !shared }
    });
    if (error) {
      console.warn(error);
      return;
    }
    console.log(result);
    shared = !shared;
  }
  async function handleDelete() {
    deleting = true;
    const [result, error] = await handleFetch(API_URL, { method: "DELETE" });
    if (error || !result.success) {
      console.warn("Unsuccessful:");
      console.warn(error);
      return;
    }
    goto("/profile");
  }
  const toggleDeleteConfirmation = () => confirmingDelete = !confirmingDelete;
  if ($$props.story === void 0 && $$bindings.story && story !== void 0)
    $$bindings.story(story);
  API_URL = `/api/stories/${id}`;
  return `${deleting ? `<button disabled class="btn join-item h-full" data-svelte-h="svelte-pviwkr"><span class="loading loading-spinner"></span>
		Deleting story</button>` : `${confirmingDelete ? `${validate_component(BottomAction, "BottomAction").$$render(
    $$result,
    {
      classes: "btn-error",
      action: handleDelete
    },
    {},
    {
      label: () => {
        return `<span slot="label" data-svelte-h="svelte-1sfipzo">Confirm Delete</span>`;
      },
      default: () => {
        return `${validate_component(Icon, "Icon").$$render($$result, { icon: "gravity-ui:trash-bin" }, {}, {})}`;
      }
    }
  )} ${validate_component(BottomAction, "BottomAction").$$render($$result, { action: toggleDeleteConfirmation }, {}, {
    label: () => {
      return `<span slot="label" data-svelte-h="svelte-iy2ren">Cancel</span>`;
    }
  })}` : `${validate_component(BottomAction, "BottomAction").$$render(
    $$result,
    {
      link: "/story/" + id + "/edit",
      icon: "gravity-ui:pencil"
    },
    {},
    {
      label: () => {
        return `<span slot="label" data-svelte-h="svelte-3awval">Edit</span>`;
      }
    }
  )} ${validate_component(BottomAction, "BottomAction").$$render(
    $$result,
    {
      action: handleShareClick,
      icon: shared ? "gravity-ui:eye" : "gravity-ui:eye-slash"
    },
    {},
    {
      label: () => {
        return `<span slot="label">${escape(shared ? "Public" : "Private")}</span>`;
      }
    }
  )} ${validate_component(BottomAction, "BottomAction").$$render(
    $$result,
    {
      action: toggleDeleteConfirmation,
      icon: "gravity-ui:trash-bin"
    },
    {},
    {
      label: () => {
        return `<span slot="label" data-svelte-h="svelte-kfdihw">Delete</span>`;
      }
    }
  )}`}`}`;
});
const StoryAuthorCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { author } = $$props;
  if ($$props.author === void 0 && $$bindings.author && author !== void 0)
    $$bindings.author(author);
  return `<a href="${"/profile/" + escape(author.id, true)}" class="btn h-full flex flex-1 items-center pr-4"><div class="avatar">${author ? `<div class="mask mask-squircle w-9 h-9"><img${add_attribute("src", author?.imageUrl + "?enhanced", 0)} alt="profile"></div>` : `<div class="mask mask-squircle w-12 h-12 skeleton"></div>`}</div> <div class="flex flex-col text-left gap-1">${author ? `<p class="opacity-50 font-normal" data-svelte-h="svelte-10w8y4a">Story shared by</p> <p>@${escape(author?.username)}</p>` : `<div class="font-bold w-[20ch] h-6 skeleton"></div> <div class="text-sm opacity-50 w-[20ch] h-4 skeleton"></div>`}</div></a>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentUserID;
  let $clerk, $$unsubscribe_clerk;
  $$unsubscribe_clerk = subscribe(clerk, (value) => $clerk = value);
  let { data } = $$props;
  let { story, author } = data;
  let imageLink;
  afterNavigate(() => {
    pageTitle.set(story.title);
    imageLink.href = window?.innerWidth > 640 ? `/story/${data.id}/cover` : "#";
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  currentUserID = $clerk?.user?.id;
  $$unsubscribe_clerk();
  return `<main class="grid md:grid-cols-2 lg:grid-cols-[2.06fr,1fr] gap-2 flex-1"><figure class="aspect-4/7 h-full w-full sm:w-3/5 mx-auto md:w-full md:order-2">${story.imageUrl ? `<a href="#?" class="sticky top-0 skeleton bg-secondary-content/80" style="${"view-transition-name: testing-" + escape(data.id, true) + ";"}"${add_attribute("this", imageLink, 0)}>${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      src: story.imageUrl,
      height: 1433,
      width: 819
    },
    {},
    {}
  )}</a>` : `${validate_component(ImagePlaceholder, "ImagePlaceholder").$$render($$result, {}, {}, {})}`}</figure> <div class="md:hidden text-center m-2">${validate_component(Title, "Title").$$render($$result, { title: story?.title }, {}, {})} <div class="divider mx-2 my-0"></div></div> <article class="flex flex-col gap-2 mx-2 md:text-lg leading-7 pb-20">${each(story?.story.split("\n") || [], (paragraph) => {
    return `<p>${escape(paragraph)}</p>`;
  })}</article></main> ${validate_component(BottomActions, "BottomActions").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(LikeButton, "LikeButton").$$render(
        $$result,
        {
          storyID: story.id,
          liked: data.liked,
          likes: data.likes
        },
        {},
        {}
      )} ${author.id == currentUserID ? `${validate_component(AuthorControls, "AuthorControls").$$render($$result, { story }, {}, {})}` : `${validate_component(StoryAuthorCard, "StoryAuthorCard").$$render($$result, { author }, {}, {})}`}`;
    }
  })}`;
});
export {
  Page as default
};

import { c as create_ssr_component, v as validate_component, a as escape, b as add_attribute } from "./ssr.js";
import { C as CldImage } from "./CldImage.js";
import { T as Title } from "./Title.js";
import { I as ImagePlaceholder } from "./BottomActions.js";
const StoryCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { story } = $$props;
  let { hideAuthorCard = false } = $$props;
  if ($$props.story === void 0 && $$bindings.story && story !== void 0)
    $$bindings.story(story);
  if ($$props.hideAuthorCard === void 0 && $$bindings.hideAuthorCard && hideAuthorCard !== void 0)
    $$bindings.hideAuthorCard(hideAuthorCard);
  return `<section class="card card-compact min-h-[450px] group"><section class="md:opacity-0 md:group-hover:opacity-100 cursor-pointer absolute w-full bottom-0 h-fit duration-500 flex items-end"><section class="w-full p-4 rounded-b-lg bg-secondary-content/80"><div><div class="md:text-lg opacity-50" data-svelte-h="svelte-1p7n5ag">Read the story:</div> ${validate_component(Title, "Title").$$render(
    $$result,
    {
      title: story?.title,
      fontSize: "text-xl md:text-2xl"
    },
    {},
    {}
  )}</div> <div class="${"hidden " + escape(hideAuthorCard ? "" : "md:flex", true) + " items-center gap-3 my-1"}"><div class="avatar"><a href="${"/profile/" + escape(story.authorId, true)}" class="mask mask-squircle w-12 h-12"><img${add_attribute("src", story.author.imageUrl, 0)} alt="profile"></a></div> <div><div class="text-sm opacity-50" data-svelte-h="svelte-m7ma5s">Shared by</div> <a href="${"/profile/" + escape(story.authorId, true)}" class="font-bold hover:opacity-80">@${escape(story.author.username)}</a></div></div></section></section> <figure class="-z-[1] aspect-4/7 w-full h-auto rounded-xl skeleton bg-secondary-content/80">${story.imageUrl ? `${validate_component(CldImage, "CldImage").$$render(
    $$result,
    {
      height: 896,
      width: 512,
      src: story.imageUrl,
      class: "h-full rounded-xl",
      style: "view-transition-name: testing-" + story.id + ";"
    },
    {},
    {}
  )}` : `${validate_component(ImagePlaceholder, "ImagePlaceholder").$$render($$result, {}, {}, {})}`}</figure></section>`;
});
export {
  StoryCard as S
};

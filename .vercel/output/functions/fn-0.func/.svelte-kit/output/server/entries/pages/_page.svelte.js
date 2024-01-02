import { c as compute_rest_props, s as subscribe } from "../../chunks/lifecycle.js";
import { c as create_ssr_component, s as spread, e as escape_object, v as validate_component } from "../../chunks/ssr.js";
import { a as afterNavigate, g as goto } from "../../chunks/navigation.js";
import { r as resetHeaderImage } from "../../chunks/index2.js";
import { S as SignInButton } from "../../chunks/SignInButton.js";
import { c as clerk } from "../../chunks/index3.js";
import { p as pageTitle } from "../../chunks/stores.js";
const SignUpButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["afterSignInUrl", "afterSignUpUrl", "redirectUrl", "mode"]);
  let $$unsubscribe_clerk;
  $$unsubscribe_clerk = subscribe(clerk, (value) => value);
  let { afterSignInUrl = void 0 } = $$props;
  let { afterSignUpUrl = void 0 } = $$props;
  let { redirectUrl = void 0 } = $$props;
  let { mode = void 0 } = $$props;
  if ($$props.afterSignInUrl === void 0 && $$bindings.afterSignInUrl && afterSignInUrl !== void 0)
    $$bindings.afterSignInUrl(afterSignInUrl);
  if ($$props.afterSignUpUrl === void 0 && $$bindings.afterSignUpUrl && afterSignUpUrl !== void 0)
    $$bindings.afterSignUpUrl(afterSignUpUrl);
  if ($$props.redirectUrl === void 0 && $$bindings.redirectUrl && redirectUrl !== void 0)
    $$bindings.redirectUrl(redirectUrl);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  $$unsubscribe_clerk();
  return `<button${spread([{ type: "button" }, escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : `Sign Up`}</button>`;
});
const WelcomeHero = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex items-center justify-center"><div class="hero-content text-center"><div class="max-w-3xl"><h1 class="text-5xl font-bold" data-svelte-h="svelte-359ov2">Unlock the <span class="text-secondary">Hidden Meanings</span> of your dreams!</h1> <p class="py-6 text-lg" data-svelte-h="svelte-1n0vaew">Welcome to our dream interpretation and storytelling service, where the mysterious realm of
				dreams comes alive! Relax as our AI dream interpreter and bedtime storyteller provides
				captivating insights and imaginative tales based on your dreams!</p> <div class="flex gap-4 justify-center">${validate_component(SignInButton, "SignInButton").$$render($$result, { class: "btn text-xl", mode: "modal" }, {}, {})} ${validate_component(SignUpButton, "SignUpButton").$$render(
    $$result,
    {
      class: "btn btn-secondary text-xl",
      mode: "modal"
    },
    {},
    {}
  )}</div></div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $clerk, $$unsubscribe_clerk;
  $$unsubscribe_clerk = subscribe(clerk, (value) => $clerk = value);
  afterNavigate(() => {
    pageTitle.set("Dreamcatcher");
    resetHeaderImage();
  });
  {
    {
      if ($clerk?.user?.id)
        goto("/feed");
    }
  }
  $$unsubscribe_clerk();
  return `<main class="m-2 md:mx-4 mb-16 md:mb-24 flex-1 grid">${validate_component(WelcomeHero, "WelcomeHero").$$render($$result, {}, {}, {})}</main>`;
});
export {
  Page as default
};

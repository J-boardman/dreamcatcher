import { c as create_ssr_component } from "../../../chunks/ssr.js";
import { a as afterNavigate } from "../../../chunks/navigation.js";
import { r as resetHeaderImage } from "../../../chunks/index2.js";
import { p as pageTitle } from "../../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  afterNavigate(() => {
    resetHeaderImage();
    pageTitle.set("Dream Journal");
  });
  return `${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};

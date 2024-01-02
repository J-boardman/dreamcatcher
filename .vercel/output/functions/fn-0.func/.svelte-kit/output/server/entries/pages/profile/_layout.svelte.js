import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main class="grid md:grid-cols-[3fr,_max-content,_1fr] m-2 mx-4">${slots.default ? slots.default({}) : ``}</main>`;
});
export {
  Layout as default
};

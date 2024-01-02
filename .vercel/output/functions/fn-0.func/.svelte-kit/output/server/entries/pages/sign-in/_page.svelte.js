import { s as subscribe } from "../../../chunks/lifecycle.js";
import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores2.js";
import { S as SignX } from "../../../chunks/SignX.js";
const SignIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SignX, "SignX").$$render($$result, Object.assign({}, { x: "in" }, $$props), {}, {})}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `<div class="flex-1 grid place-items-center">${validate_component(SignIn, "SignIn").$$render($$result, { redirectUrl: "/admin" }, {}, {})}</div>`;
});
export {
  Page as default
};

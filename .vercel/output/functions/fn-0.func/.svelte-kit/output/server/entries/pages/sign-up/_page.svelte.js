import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { S as SignX } from "../../../chunks/SignX.js";
const SignUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(SignX, "SignX").$$render($$result, Object.assign({}, { x: "up" }, $$props), {}, {})}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(SignUp, "SignUp").$$render($$result, { redirectUrl: "/admin" }, {}, {})}</div>`;
});
export {
  Page as default
};

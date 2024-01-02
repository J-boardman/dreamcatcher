import { c as create_ssr_component } from "./ssr.js";
import "@clerk/clerk-js";
const SignX = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let afterSignXUrl;
  let { x = "in" } = $$props;
  if ($$props.x === void 0 && $$bindings.x && x !== void 0)
    $$bindings.x(x);
  afterSignXUrl = x === "in" ? "afterSignInUrl" : "afterSignUpUrl";
  $$props.redirectUrl || $$props[afterSignXUrl] || "/";
  return `${``}`;
});
export {
  SignX as S
};

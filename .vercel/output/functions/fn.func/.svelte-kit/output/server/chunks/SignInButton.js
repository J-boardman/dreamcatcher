import { c as compute_rest_props, s as subscribe } from "./lifecycle.js";
import { c as create_ssr_component, s as spread, e as escape_object } from "./ssr.js";
import { c as clerk } from "./index3.js";
const SignInButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  return `<button${spread([{ type: "button" }, escape_object($$restProps)], {})}>${slots.default ? slots.default({}) : `Sign In`}</button>`;
});
export {
  SignInButton as S
};

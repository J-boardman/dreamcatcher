import { c as create_ssr_component, v as validate_component, b as add_attribute, a as escape, d as each } from "./ssr.js";
import { s as subscribe } from "./lifecycle.js";
import { c as clerk } from "./index3.js";
const ClerkLoaded = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $clerk, $$unsubscribe_clerk;
  $$unsubscribe_clerk = subscribe(clerk, (value) => $clerk = value);
  $$unsubscribe_clerk();
  return `${$clerk ? `${slots.default ? slots.default({ clerk: $clerk }) : ``}` : ``}`;
});
const SignedIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(ClerkLoaded, "ClerkLoaded").$$render($$result, {}, {}, {
    default: ({ clerk: clerk2 }) => {
      return `${clerk2 && clerk2.user ? `${slots.default ? slots.default({ user: clerk2.user }) : ``}` : ``}`;
    }
  })}`;
});
const Title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let titleArray;
  let longestWord;
  let { title = "" } = $$props;
  let { fontSize = "text-3xl" } = $$props;
  let { fontColor = "text-secondary" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.fontSize === void 0 && $$bindings.fontSize && fontSize !== void 0)
    $$bindings.fontSize(fontSize);
  if ($$props.fontColor === void 0 && $$bindings.fontColor && fontColor !== void 0)
    $$bindings.fontColor(fontColor);
  titleArray = title.split(" ");
  longestWord = titleArray.reduce((a, b) => a.length > b.length ? a : b);
  return `<h2${add_attribute("class", fontSize, 0)}>${titleArray.length == 1 ? `${escape(title)}` : `${each(titleArray, (word) => {
    return `${word == longestWord ? `<strong class="${escape(fontColor, true) + " font-normal"}">${escape(word)} </strong>` : `<strong class="font-normal">${escape(word)} </strong>`}`;
  })}`}</h2>`;
});
export {
  ClerkLoaded as C,
  SignedIn as S,
  Title as T
};

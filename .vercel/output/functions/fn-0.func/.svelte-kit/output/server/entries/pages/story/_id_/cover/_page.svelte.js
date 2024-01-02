import { s as subscribe } from "../../../../../chunks/lifecycle.js";
import { c as create_ssr_component, b as add_attribute, a as escape } from "../../../../../chunks/ssr.js";
import { a as afterNavigate } from "../../../../../chunks/navigation.js";
import { p as page } from "../../../../../chunks/stores2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let src;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let zoom = Boolean($page.url.searchParams.get("zoom"));
  afterNavigate(() => {
    zoom = Boolean($page.url.searchParams.get("zoom"));
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  src = data.imageUrl;
  $$unsubscribe_page();
  return `<button${add_attribute("class", !zoom ? "cursor-zoom-in" : "cursor-zoom-out", 0)}><img${add_attribute("src", src, 0)} alt="cover" class="${"mx-auto " + escape(zoom ? "md:w-11/12" : "", true)}" style="${"view-transition-name: testing-" + escape(data.id, true) + ";"}"></button>`;
});
export {
  Page as default
};

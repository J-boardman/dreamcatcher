import { c as create_ssr_component, b as add_attribute, a as escape, v as validate_component } from "./ssr.js";
import { I as Icon } from "./Icon.js";
const BottomAction = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let buttonClasses;
  let { link = "" } = $$props;
  let { active = false } = $$props;
  let { hiddenTextOnMobile = false } = $$props;
  let { action = () => void 0 } = $$props;
  let { classes = "" } = $$props;
  let { disabled = false } = $$props;
  let { icon = "" } = $$props;
  if ($$props.link === void 0 && $$bindings.link && link !== void 0)
    $$bindings.link(link);
  if ($$props.active === void 0 && $$bindings.active && active !== void 0)
    $$bindings.active(active);
  if ($$props.hiddenTextOnMobile === void 0 && $$bindings.hiddenTextOnMobile && hiddenTextOnMobile !== void 0)
    $$bindings.hiddenTextOnMobile(hiddenTextOnMobile);
  if ($$props.action === void 0 && $$bindings.action && action !== void 0)
    $$bindings.action(action);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  buttonClasses = "h-full btn join-item " + classes;
  return `${link ? `<a${add_attribute("href", link, 0)} class="${[escape(buttonClasses, true), active ? "btn-secondary" : ""].join(" ").trim()}"><div class="flex flex-col sm:flex-row gap-1 items-center">${validate_component(Icon, "Icon").$$render($$result, { icon, class: "text-lg" }, {}, {})} ${slots.label ? slots.label({
    class: "text-sm sm:text-sm " + (hiddenTextOnMobile ? "hidden md:flex" : "")
  }) : ``} ${slots.default ? slots.default({}) : ``}</div></a>` : `<button ${disabled ? "disabled" : ""} class="${[escape(buttonClasses, true), active ? "btn-secondary" : ""].join(" ").trim()}"><div class="flex flex-col sm:flex-row sm:gap-1 items-center">${validate_component(Icon, "Icon").$$render($$result, { icon, class: "text-lg" }, {}, {})} ${slots.label ? slots.label({
    class: "text-sm sm:text-sm " + (hiddenTextOnMobile ? "hidden md:flex" : "")
  }) : ``} ${slots.default ? slots.default({}) : ``}</div></button>`}`;
});
export {
  BottomAction as B
};

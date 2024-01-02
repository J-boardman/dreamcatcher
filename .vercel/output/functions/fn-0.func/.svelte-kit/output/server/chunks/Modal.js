import { c as create_ssr_component, a as escape, b as add_attribute } from "./ssr.js";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let dialogElement;
  let { noAnimate = false } = $$props;
  let { buttonText = "Open" } = $$props;
  let { busy = false } = $$props;
  let { classes = "" } = $$props;
  let { open = false } = $$props;
  if ($$props.noAnimate === void 0 && $$bindings.noAnimate && noAnimate !== void 0)
    $$bindings.noAnimate(noAnimate);
  if ($$props.buttonText === void 0 && $$bindings.buttonText && buttonText !== void 0)
    $$bindings.buttonText(buttonText);
  if ($$props.busy === void 0 && $$bindings.busy && busy !== void 0)
    $$bindings.busy(busy);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0)
    $$bindings.classes(classes);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  return ` <button ${busy ? "disabled" : ""} class="${"btn " + escape(noAnimate ? "animate-none" : "", true) + " " + escape(classes, true)}">${slots.logo ? slots.logo({}) : ``} ${slots["button-text"] ? slots["button-text"]({}) : ``} ${escape(buttonText)}</button> <dialog class="modal grid modal-bottom md:place-items-center" ${open ? "open" : ""}${add_attribute("this", dialogElement, 0)}><div class="modal-box max-w-5xl mx-auto bg-base-300 md:rounded-2xl pt-0"><form method="dialog" class="sticky top-0 bg-base-300 z-30 pt-6"><article class="flex justify-between items-center">${slots.title ? slots.title({}) : ``} <button class="btn btn-sm btn-circle btn-ghost ml-auto" data-svelte-h="svelte-1kfntbr">✕</button></article> <div class="divider divider-neutral my-2"></div></form> ${slots.default ? slots.default({}) : ``}</div> <form method="dialog" class="modal-backdrop" data-svelte-h="svelte-5gpmjx"><button>close</button></form></dialog>`;
});
export {
  Modal as M
};

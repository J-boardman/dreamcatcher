

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/journal/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.bfcb3acc.js","_app/immutable/chunks/scheduler.24c66ff4.js","_app/immutable/chunks/index.175ea22e.js","_app/immutable/chunks/navigation.ce6aac00.js","_app/immutable/chunks/singletons.64e0d3a6.js","_app/immutable/chunks/index.9d0e48d0.js","_app/immutable/chunks/index.6dac0e4f.js","_app/immutable/chunks/stores.745d342d.js"];
export const stylesheets = [];
export const fonts = [];

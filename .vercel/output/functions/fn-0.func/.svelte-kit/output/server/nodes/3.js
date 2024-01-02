

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/journal/_id_/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.0f8f8023.js","_app/immutable/chunks/scheduler.24c66ff4.js","_app/immutable/chunks/index.175ea22e.js","_app/immutable/chunks/index.9d0e48d0.js"];
export const stylesheets = [];
export const fonts = [];

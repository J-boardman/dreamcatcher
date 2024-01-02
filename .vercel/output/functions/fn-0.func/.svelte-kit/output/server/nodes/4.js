

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.66f2eb92.js","_app/immutable/chunks/scheduler.24c66ff4.js","_app/immutable/chunks/index.175ea22e.js"];
export const stylesheets = [];
export const fonts = [];

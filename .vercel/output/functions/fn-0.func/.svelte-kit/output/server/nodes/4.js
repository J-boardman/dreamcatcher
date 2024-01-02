

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.9ecd3c78.js","_app/immutable/chunks/scheduler.3b07f987.js","_app/immutable/chunks/index.c72e2f07.js"];
export const stylesheets = [];
export const fonts = [];

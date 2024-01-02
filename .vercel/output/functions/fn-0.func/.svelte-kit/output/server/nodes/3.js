

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/journal/_id_/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.b9fdaf89.js","_app/immutable/chunks/scheduler.3b07f987.js","_app/immutable/chunks/index.c72e2f07.js","_app/immutable/chunks/index.76fa2d59.js"];
export const stylesheets = [];
export const fonts = [];

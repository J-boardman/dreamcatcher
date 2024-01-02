import * as server from '../entries/pages/story/_id_/edit/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/story/_id_/edit/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/story/[id]/edit/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.9ada0cd4.js","_app/immutable/chunks/scheduler.24c66ff4.js","_app/immutable/chunks/index.175ea22e.js"];
export const stylesheets = [];
export const fonts = [];

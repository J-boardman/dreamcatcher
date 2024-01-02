import * as server from '../entries/pages/story/_id_/edit/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/story/_id_/edit/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/story/[id]/edit/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.d65e666e.js","_app/immutable/chunks/scheduler.3b07f987.js","_app/immutable/chunks/index.c72e2f07.js"];
export const stylesheets = [];
export const fonts = [];

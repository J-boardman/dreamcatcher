import * as server from '../entries/pages/story/_id_/cover/_page.server.ts.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/story/_id_/cover/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/story/[id]/cover/+page.server.ts";
export const imports = ["_app/immutable/nodes/14.4385fd16.js","_app/immutable/chunks/scheduler.24c66ff4.js","_app/immutable/chunks/index.175ea22e.js","_app/immutable/chunks/navigation.ce6aac00.js","_app/immutable/chunks/singletons.64e0d3a6.js","_app/immutable/chunks/index.9d0e48d0.js","_app/immutable/chunks/stores.18c5f3a7.js"];
export const stylesheets = [];
export const fonts = [];

import * as server from '../entries/pages/story/_id_/cover/_page.server.ts.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/story/_id_/cover/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/story/[id]/cover/+page.server.ts";
export const imports = ["_app/immutable/nodes/14.f1415517.js","_app/immutable/chunks/scheduler.3b07f987.js","_app/immutable/chunks/index.c72e2f07.js","_app/immutable/chunks/navigation.c51359bf.js","_app/immutable/chunks/singletons.fa76c5dc.js","_app/immutable/chunks/index.76fa2d59.js","_app/immutable/chunks/stores.2d407fbe.js"];
export const stylesheets = [];
export const fonts = [];

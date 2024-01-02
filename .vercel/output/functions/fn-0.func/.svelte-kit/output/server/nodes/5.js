import * as universal from '../entries/pages/_page.ts.js';
import * as server from '../entries/pages/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.85720c1c.js","_app/immutable/chunks/scheduler.3b07f987.js","_app/immutable/chunks/index.c72e2f07.js","_app/immutable/chunks/navigation.c51359bf.js","_app/immutable/chunks/singletons.fa76c5dc.js","_app/immutable/chunks/index.76fa2d59.js","_app/immutable/chunks/index.d3367806.js","_app/immutable/chunks/stores.b4316504.js","_app/immutable/chunks/SignInButton.2ae53d55.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/index.b07aa697.js"];
export const stylesheets = [];
export const fonts = [];

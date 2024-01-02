import * as universal from '../entries/pages/_page.ts.js';
import * as server from '../entries/pages/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.ece10180.js","_app/immutable/chunks/scheduler.24c66ff4.js","_app/immutable/chunks/index.175ea22e.js","_app/immutable/chunks/navigation.ce6aac00.js","_app/immutable/chunks/singletons.64e0d3a6.js","_app/immutable/chunks/index.9d0e48d0.js","_app/immutable/chunks/index.6dac0e4f.js","_app/immutable/chunks/stores.745d342d.js","_app/immutable/chunks/SignInButton.b086cb0a.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/index.793d310b.js"];
export const stylesheets = [];
export const fonts = [];

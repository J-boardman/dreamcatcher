import * as server from '../entries/pages/profile/_id_/_page.server.ts.js';

export const index = 10;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/profile/_id_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/profile/[id]/+page.server.ts";
export const imports = ["_app/immutable/nodes/10.1ca1629b.js","_app/immutable/chunks/scheduler.3b07f987.js","_app/immutable/chunks/index.c72e2f07.js","_app/immutable/chunks/Title.49fc599e.js","_app/immutable/chunks/navigation.c51359bf.js","_app/immutable/chunks/singletons.fa76c5dc.js","_app/immutable/chunks/index.76fa2d59.js","_app/immutable/chunks/stores.2d407fbe.js","_app/immutable/chunks/ProfileBottomNavigation.4d38b86a.js","_app/immutable/chunks/BottomActions.a1fe9458.js","_app/immutable/chunks/spread.8a54911c.js","_app/immutable/chunks/index.b07aa697.js","_app/immutable/chunks/SignedIn.0348b39f.js","_app/immutable/chunks/StoryCard.6cd06b38.js","_app/immutable/chunks/CldImage.d1cd99bf.js","_app/immutable/chunks/_commonjsHelpers.668aeb87.js","_app/immutable/chunks/stores.b4316504.js"];
export const stylesheets = ["_app/immutable/assets/BottomActions.1b2fd8dd.css"];
export const fonts = [];

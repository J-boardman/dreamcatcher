

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/journal/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.168891d8.js","_app/immutable/chunks/scheduler.3b07f987.js","_app/immutable/chunks/index.c72e2f07.js","_app/immutable/chunks/navigation.c51359bf.js","_app/immutable/chunks/singletons.fa76c5dc.js","_app/immutable/chunks/index.76fa2d59.js","_app/immutable/chunks/index.d3367806.js","_app/immutable/chunks/stores.b4316504.js"];
export const stylesheets = [];
export const fonts = [];

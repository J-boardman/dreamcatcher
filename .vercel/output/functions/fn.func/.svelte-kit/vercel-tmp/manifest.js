export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.05bd6c99.js","app":"_app/immutable/entry/app.c22275a2.js","imports":["_app/immutable/entry/start.05bd6c99.js","_app/immutable/chunks/scheduler.3b07f987.js","_app/immutable/chunks/singletons.fa76c5dc.js","_app/immutable/chunks/index.76fa2d59.js","_app/immutable/entry/app.c22275a2.js","_app/immutable/chunks/index.b07aa697.js","_app/immutable/chunks/index.76fa2d59.js","_app/immutable/chunks/scheduler.3b07f987.js","_app/immutable/chunks/_commonjsHelpers.668aeb87.js","_app/immutable/chunks/index.c72e2f07.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js'))
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
}
})();

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
		client: {"start":"_app/immutable/entry/start.a0d23407.js","app":"_app/immutable/entry/app.8501921b.js","imports":["_app/immutable/entry/start.a0d23407.js","_app/immutable/chunks/scheduler.24c66ff4.js","_app/immutable/chunks/singletons.64e0d3a6.js","_app/immutable/chunks/index.9d0e48d0.js","_app/immutable/entry/app.8501921b.js","_app/immutable/chunks/index.793d310b.js","_app/immutable/chunks/index.9d0e48d0.js","_app/immutable/chunks/scheduler.24c66ff4.js","_app/immutable/chunks/_commonjsHelpers.668aeb87.js","_app/immutable/chunks/index.175ea22e.js"],"stylesheets":[],"fonts":[]},
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

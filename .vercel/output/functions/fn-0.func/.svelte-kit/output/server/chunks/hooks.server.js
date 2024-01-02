import { verifyToken } from "@clerk/backend";
import { C as CLERK_SECRET_KEY } from "./private.js";
function sequence(...handlers) {
  const length = handlers.length;
  if (!length)
    return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers[i];
      return handle2({
        event: event2,
        resolve: (event3, options) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options?.transformPageChunk) {
              html = await options.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options?.preload;
          return i < length - 1 ? apply_handle(i + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
function handleClerk(secretKey, { debug = false, protectedPaths = [], signInUrl = "/sign-in" }) {
  return async ({ event, resolve }) => {
    const sessionToken = event.cookies.get("__session");
    debug && console.log("[Clerk SvelteKit] " + event.url.pathname);
    if (sessionToken) {
      debug && console.log("[Clerk SvelteKit] Found session token in cookies.");
      try {
        const session = await verifySession(secretKey, sessionToken);
        if (session) {
          debug && console.log("[Clerk SvelteKit] Session verified successfully.");
          event.locals.session = session;
        } else {
          debug && console.warn("[Clerk SvelteKit] Session verification returned no session.");
        }
      } catch (error) {
        debug && console.log("[Clerk SvelteKit] Session verification failed.", error?.reason ?? error);
      }
    } else {
      debug && console.log("[Clerk SvelteKit] No session token found in cookies.");
    }
    if (!event.locals.session && protectedPaths.find((path) => typeof path === "string" ? event.url.pathname.startsWith(path) : path(event))) {
      debug && console.log("[Clerk SvelteKit] No session found, redirecting to login screen.");
      return Response.redirect(event.url.origin + signInUrl + "?redirectUrl=" + event.url.pathname);
    }
    return resolve(event);
  };
}
const verifySession = async (secretKey, sessionToken) => {
  if (sessionToken) {
    const issuer = (issuer2) => issuer2.startsWith("https://clerk.") || issuer2.includes(".clerk.accounts");
    const claims = await verifyToken(sessionToken, {
      secretKey,
      issuer
    });
    return {
      userId: claims.sub,
      claims
    };
  }
};
const handle = sequence(
  handleClerk(CLERK_SECRET_KEY, {
    debug: true,
    protectedPaths: ["/profile", "/journal", "/story"],
    signInUrl: "/sign-in"
  })
);
export {
  handle
};

import { Clerk } from "@clerk/backend";
import { C as CLERK_SECRET_KEY } from "./private.js";
const clerk = Clerk({ apiKey: CLERK_SECRET_KEY });
export {
  clerk as c
};

import { r as redirect } from "../../chunks/index.js";
async function load({ url, locals }) {
  if (locals.session?.userId)
    throw redirect(301, "/feed");
}
export {
  load
};

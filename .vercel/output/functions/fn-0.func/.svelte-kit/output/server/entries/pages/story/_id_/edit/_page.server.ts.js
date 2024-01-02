import { e as getStoryById } from "../../../../../chunks/stories.js";
import { e as error } from "../../../../../chunks/index.js";
async function load({ params, locals }) {
  const [story] = await getStoryById(Number(params.id));
  if (locals.session.userId != story.authorId) {
    throw error(403, "Forbidden");
  }
  return {};
}
export {
  load
};

import { g as getLikeCount, l as likeStory, a as removeLike } from "../../../../../../chunks/storyLikes.js";
import { j as json } from "../../../../../../chunks/index.js";
async function GET({ params }) {
  const likes = await getLikeCount(Number(params.id));
  return json(likes);
}
async function POST({ params, locals }) {
  const userID = locals.session.userId;
  const result = await likeStory(Number(params.id), userID);
  return json(result);
}
async function DELETE({ params, locals }) {
  const userID = locals.session.userId;
  const result = await removeLike(Number(params.id), userID);
  return json(result);
}
export {
  DELETE,
  GET,
  POST
};

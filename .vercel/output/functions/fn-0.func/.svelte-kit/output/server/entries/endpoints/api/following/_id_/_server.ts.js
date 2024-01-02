import { g as getFollowerCount } from "../../../../../chunks/userFollowings.js";
import { j as json } from "../../../../../chunks/index.js";
async function GET({ params }) {
  const followerCount = await getFollowerCount(params.id);
  return json(followerCount);
}
export {
  GET
};

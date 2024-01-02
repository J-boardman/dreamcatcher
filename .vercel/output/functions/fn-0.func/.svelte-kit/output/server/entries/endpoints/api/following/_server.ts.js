import { n as newFollowing, r as removeFollowing } from "../../../../chunks/userFollowings.js";
import { j as json } from "../../../../chunks/index.js";
async function POST({ request }) {
  const { follower, following } = await request.json();
  const newFollow = await newFollowing(follower, following);
  return json({
    following: newFollow.rowsAffected
  });
}
async function DELETE({ request }) {
  const { follower, following } = await request.json();
  const newFollow = await removeFollowing(follower, following);
  return json({
    following: newFollow.rowsAffected
  });
}
export {
  DELETE,
  POST
};

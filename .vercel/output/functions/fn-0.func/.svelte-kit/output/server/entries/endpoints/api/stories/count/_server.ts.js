import { i as isFollowingFeed } from "../../../../../chunks/index2.js";
import { a as getSharedStoryCount } from "../../../../../chunks/stories.js";
import { b as getFollowingFeedCount } from "../../../../../chunks/userFollowings.js";
import { j as json } from "../../../../../chunks/index.js";
async function GET({ url, locals }) {
  const storyCount = isFollowingFeed(url) ? await getFollowingFeedCount(locals.session.userId) : await getSharedStoryCount();
  console.log(storyCount);
  return json({ storyCount });
}
export {
  GET
};

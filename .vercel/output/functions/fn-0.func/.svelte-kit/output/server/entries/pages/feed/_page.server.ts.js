import { i as isFollowingFeed } from "../../../chunks/index2.js";
import { g as getSharedStories } from "../../../chunks/stories.js";
import { a as getFollowingFeed } from "../../../chunks/userFollowings.js";
import { c as clerk } from "../../../chunks/clerk.js";
async function load({ url, locals }) {
  const users = await clerk.users.getUserList();
  let stories;
  if (isFollowingFeed(url)) {
    stories = (await getFollowingFeed(locals.session.userId)).map((item) => {
      return item.stories;
    });
  } else
    stories = await getSharedStories();
  const storiesWithAuthor = stories.map((story) => {
    const author = users.find((item) => item.id == story.authorId);
    return {
      ...story,
      author: {
        username: author?.username,
        imageUrl: author?.imageUrl
      }
    };
  }).reverse();
  return { stories: storiesWithAuthor };
}
export {
  load
};

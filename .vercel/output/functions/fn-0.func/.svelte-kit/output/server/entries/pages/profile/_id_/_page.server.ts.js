import { b as getStoriesByAuthor } from "../../../../chunks/stories.js";
import { b as getLikesByUser } from "../../../../chunks/storyLikes.js";
import { g as getFollowerCount, d as checkIfFollowing } from "../../../../chunks/userFollowings.js";
import { c as clerk } from "../../../../chunks/clerk.js";
async function load({ params, locals, url }) {
  const users = await clerk.users.getUserList();
  const user = users.find((item) => item.id == params.id);
  const { id, username, imageUrl } = user;
  const followerCount = await getFollowerCount(params.id);
  const followedByUser = (await checkIfFollowing(locals.session.userId, params.id))[0].count;
  const filter = url.searchParams.get("filter");
  let stories = [];
  if (!filter) {
    stories = (await getStoriesByAuthor(id)).map((item) => ({
      ...item,
      author: { id, username, imageUrl }
    }));
  } else if (filter == "liked") {
    stories = (await getLikesByUser(id)).map((item) => item.stories).map((story) => {
      const { id: id2, username: username2, imageUrl: imageUrl2 } = users.find((item) => item.id == story?.authorId);
      return {
        ...story,
        author: { id: id2, username: username2, imageUrl: imageUrl2 }
      };
    });
  }
  return {
    id: params.id,
    username,
    imageUrl,
    followerCount,
    followedByUser: followedByUser > 0,
    stories
  };
}
export {
  load
};

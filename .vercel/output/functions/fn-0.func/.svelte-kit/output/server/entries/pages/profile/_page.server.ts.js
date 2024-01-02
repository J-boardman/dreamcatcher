import { b as getStoriesByAuthor } from "../../../chunks/stories.js";
import { b as getLikesByUser } from "../../../chunks/storyLikes.js";
import { c as getUserFollowers } from "../../../chunks/userFollowings.js";
import { c as clerk } from "../../../chunks/clerk.js";
async function load({ url, locals }) {
  const users = await clerk.users.getUserList();
  const { id, username, imageUrl } = users.find((item) => item.id == locals.session.userId);
  const followingList = await getUserFollowers(id);
  const followers = followingList.map((item) => {
    const { id: id2, username: username2, firstName, imageUrl: imageUrl2 } = users.find((user) => user.id == item.followerID);
    return { id: id2, username: username2, firstName, imageUrl: imageUrl2 };
  });
  const followerCount = followingList.length;
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
    user: { id, username, imageUrl },
    stories,
    followers,
    followerCount
  };
}
export {
  load
};

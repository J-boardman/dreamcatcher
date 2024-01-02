import { e as getStoryById } from "../../../../chunks/stories.js";
import { g as getLikeCount, c as checkIfLiked } from "../../../../chunks/storyLikes.js";
import { c as clerk } from "../../../../chunks/clerk.js";
import { e as error } from "../../../../chunks/index.js";
async function load({ params, url, locals }) {
  const story = (await getStoryById(params.id))[0];
  if (!story)
    throw error(404, "Story not found!");
  const userID = locals?.session.userId;
  const { id, username, imageUrl } = await clerk.users.getUser(story.authorId);
  const likes = await getLikeCount(story.id);
  const likedByUser = await checkIfLiked(story.id, userID);
  return {
    id: params.id,
    story,
    author: { id, username, imageUrl },
    liked: likedByUser ? true : false,
    likes
  };
}
export {
  load
};

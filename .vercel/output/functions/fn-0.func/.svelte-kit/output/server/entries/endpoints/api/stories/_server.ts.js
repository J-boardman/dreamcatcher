import { i as insertStory, g as getSharedStories } from "../../../../chunks/stories.js";
import { a as getFollowingFeed } from "../../../../chunks/userFollowings.js";
import { c as clerk } from "../../../../chunks/clerk.js";
import { j as json } from "../../../../chunks/index.js";
async function POST({ request }) {
  const story = await request.json();
  const insertedStory = await insertStory(story);
  return json(insertedStory);
}
async function GET({ url, locals }) {
  const offset = Number(url.searchParams.get("skip")) || 0;
  const filter = url.searchParams.get("filter");
  const userId = locals.session.userId;
  let stories = filter == "following" ? (await getFollowingFeed(userId)).map((item) => item.stories) : await getSharedStories(offset);
  const users = await clerk.users.getUserList();
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
  console.log(storiesWithAuthor.length);
  return json({ stories: storiesWithAuthor });
}
export {
  GET,
  POST
};

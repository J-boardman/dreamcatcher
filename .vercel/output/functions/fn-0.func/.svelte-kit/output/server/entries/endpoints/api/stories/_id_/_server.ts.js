import { u as updateStory, d as deleteStory } from "../../../../../chunks/stories.js";
import { r as removeStoryLikes } from "../../../../../chunks/storyLikes.js";
import { j as json } from "../../../../../chunks/index.js";
async function PATCH({ params, locals, request }) {
  const data = await request.json();
  const result = await updateStory(params.id, { ...data });
  return json({ updated: result.rowsAffected });
}
async function DELETE({ params }) {
  const deletedStory = await deleteStory(params.id);
  const removedLikes = await removeStoryLikes(params.id);
  return json({
    success: deletedStory.rowsAffected > 0,
    likesRemoved: removedLikes.rowsAffected > 0
  });
}
export {
  DELETE,
  PATCH
};

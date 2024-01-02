import { c as db, s as stories } from "./stories.js";
import { count, eq, and } from "drizzle-orm";
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
const storyLikes = mysqlTable("story_likes", {
  storyID: serial("story_id").notNull(),
  userID: varchar("user_id", { length: 255 }).notNull()
});
const storyAndUserIDsMatch = (storyID, userID) => {
  return and(eq(storyLikes.storyID, storyID), eq(storyLikes.userID, userID));
};
async function likeStory(storyID, userID) {
  return db.insert(storyLikes).values({ storyID, userID });
}
async function removeLike(storyID, userID) {
  return db.delete(storyLikes).where(storyAndUserIDsMatch(storyID, userID));
}
async function checkIfLiked(storyID, userID) {
  return (await db.select().from(storyLikes).where(storyAndUserIDsMatch(storyID, userID))).length;
}
async function getLikeCount(storyID) {
  const [query] = await db.select({ count: count() }).from(storyLikes).where(eq(storyLikes.storyID, storyID));
  return query.count;
}
async function getLikesByUser(userID) {
  return db.select().from(storyLikes).leftJoin(stories, eq(stories.id, storyLikes.storyID)).where(eq(storyLikes.userID, userID));
}
async function removeStoryLikes(storyID) {
  return db.delete(storyLikes).where(eq(storyLikes.storyID, Number(storyID)));
}
export {
  removeLike as a,
  getLikesByUser as b,
  checkIfLiked as c,
  getLikeCount as g,
  likeStory as l,
  removeStoryLikes as r
};

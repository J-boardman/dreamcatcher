import { c as db, s as stories } from "./stories.js";
import { sql, and, eq, count } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
const userFollowings = mysqlTable("user_followings", {
  followerID: varchar("follower_id", { length: 255 }).notNull(),
  followingID: varchar("follows_id", { length: 255 }).notNull()
});
async function newFollowing(followerID, followingID) {
  return db.insert(userFollowings).values({ followerID, followingID });
}
async function checkIfFollowing(followerID, followingID) {
  return db.select({ count: sql`count(follower_id)`.mapWith(Number) }).from(userFollowings).where(
    and(
      eq(userFollowings.followerID, followerID),
      eq(userFollowings.followingID, followingID)
    )
  );
}
async function getUserFollowers(followingID) {
  return db.select().from(userFollowings).where(eq(userFollowings.followingID, followingID));
}
async function removeFollowing(followerID, followingID) {
  return db.delete(userFollowings).where(
    and(
      eq(userFollowings.followerID, followerID),
      eq(userFollowings.followingID, followingID)
    )
  );
}
async function getFollowingFeed(followerID, limit = 8, offset = 0) {
  return await db.select().from(userFollowings).innerJoin(stories, eq(userFollowings.followingID, stories.authorId)).where(eq(userFollowings.followerID, followerID)).limit(limit).offset(offset);
}
async function getFollowingFeedCount(followerID) {
  const [query] = await db.select({ count: count() }).from(userFollowings).innerJoin(stories, eq(userFollowings.followingID, stories.authorId)).where(eq(userFollowings.followerID, followerID));
  return query.count;
}
async function getFollowerCount(followingID) {
  const [query] = await db.select({ count: count() }).from(userFollowings).where(eq(userFollowings.followingID, followingID));
  return query.count;
}
export {
  getFollowingFeed as a,
  getFollowingFeedCount as b,
  getUserFollowers as c,
  checkIfFollowing as d,
  getFollowerCount as g,
  newFollowing as n,
  removeFollowing as r
};

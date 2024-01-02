import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { p as private_env } from "./shared-server.js";
import { eq, desc, count } from "drizzle-orm";
import { mysqlTable, serial, varchar, boolean } from "drizzle-orm/mysql-core";
const connection = connect({
  host: private_env.DATABASE_HOST,
  username: private_env.DATABASE_USERNAME,
  password: private_env.DATABASE_PASSWORD
});
const db = drizzle(connection);
const stories = mysqlTable("stories", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 60 }).notNull(),
  story: varchar("story", { length: 10200 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 2048 }),
  shared: boolean("shared").default(false).notNull(),
  authorId: varchar("author_id", { length: 255 }).notNull()
});
async function insertStory(story) {
  return (await db.insert(stories).values(story)).insertId;
}
const getStories = () => db.select().from(stories).orderBy(desc(stories.id));
const matchID = (id) => eq(stories.id, Number(id));
async function getStoryById(id) {
  return getStories().where(matchID(id));
}
async function updateStory(id, updatedItem) {
  return db.update(stories).set(updatedItem).where(matchID(id));
}
async function deleteStory(id) {
  return db.delete(stories).where(matchID(id));
}
async function getStoriesByAuthor(authorID) {
  return getStories().where(eq(stories.authorId, authorID));
}
async function getStoryImage(id) {
  return db.select({ image: stories.imageUrl }).from(stories).where(matchID(id));
}
async function getSharedStories(offset = 0, limit = 4) {
  return db.select({ id: stories.id, title: stories.title, imageUrl: stories.imageUrl, authorId: stories.authorId }).from(stories).orderBy(desc(stories.id)).where(eq(stories.shared, true)).limit(limit).offset(offset);
}
async function getSharedStoryCount() {
  const [query] = await db.select({ count: count() }).from(stories).where(eq(stories.shared, true));
  return query.count;
}
export {
  getSharedStoryCount as a,
  getStoriesByAuthor as b,
  db as c,
  deleteStory as d,
  getStoryById as e,
  getStoryImage as f,
  getSharedStories as g,
  insertStory as i,
  stories as s,
  updateStory as u
};

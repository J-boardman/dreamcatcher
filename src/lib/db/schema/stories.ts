import { db } from "$lib/services/database";
import type { ExecutedQuery } from "@planetscale/database";
import { eq } from "drizzle-orm";
import { boolean, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const stories = mysqlTable('stories', {
    id: serial('id').primaryKey().autoincrement(),
    title: varchar('title', { length: 60 }).notNull(),
    story: varchar('story', { length: 10200 }).notNull(),
    imageUrl: varchar('imageUrl', { length: 2048 }),
    shared: boolean('shared').default(false).notNull(),
    authorId: varchar('author_id', { length: 255 }).notNull()
})

export type Story = typeof stories.$inferSelect;
export type NewStory = typeof stories.$inferInsert;
// BASIC CRUD
export async function insertStory(story: NewStory) {
    return (await db.insert(stories).values(story)).insertId
}

export async function getStories() {
    return db.select().from(stories);
}

export async function getStoryById(id: number) {
    return db.select().from(stories).where(eq(stories.id, id))
}

export async function updateStory(id: number, updatedItem: Partial<Story>) {
    return db.update(stories).set(updatedItem).where(eq(stories.id, id))
}

export async function deleteStory(id: number) {
    return db.delete(stories).where(eq(stories.id, id));
}

// ADVANCED CRUD
export async function getStoriesByAuthor(authorID: string){
    return db.select().from(stories).where(eq(stories.authorId, authorID));
}

export async function getStoryImage(id: number) {
    return db.select({ image: stories.imageUrl }).from(stories).where(eq(stories.id, id));
}

export async function getSharedStories() {
    return db.select({ id: stories.id, title: stories.title, imageUrl: stories.imageUrl, authorId: stories.authorId }).from(stories).where(eq(stories.shared, true))
}

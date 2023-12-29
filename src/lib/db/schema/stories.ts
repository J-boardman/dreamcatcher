import { db } from "$lib/services/database";
import type { ExecutedQuery } from "@planetscale/database";
import { asc, count, desc, eq, sql } from "drizzle-orm";
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

const getStories = () => db.select().from(stories).orderBy(desc(stories.id));
const matchID = (id: string | number) => eq(stories.id, Number(id))

export async function getStoryById(id: number | string) {
    return getStories().where(matchID(id))
}

export async function updateStory(id: number | string, updatedItem: Partial<Story>) {
    return db.update(stories).set(updatedItem).where(matchID(id))
}

export async function deleteStory(id: number | string) {
    return db.delete(stories).where(matchID(id));
}

export async function getStoriesByAuthor(authorID: string) {
    return getStories().where(eq(stories.authorId, authorID));
}

export async function getStoryImage(id: number | string) {
    return db.select({ image: stories.imageUrl }).from(stories).where(matchID(id));
}

// ADVANCED CRUD
export async function getSharedStories(offset = 0, limit = 4) {
    return db
        .select({ id: stories.id, title: stories.title, imageUrl: stories.imageUrl, authorId: stories.authorId })
        .from(stories)
        .orderBy(desc(stories.id))
        .where(eq(stories.shared, true))
        .limit(limit)
        .offset(offset)
}
export async function getSharedStoryCount() {
    const [query] = await db
        .select({ count: count() })
        .from(stories)
        .where(eq(stories.shared, true));

    return query.count
}

import { db } from "$lib/services/database";
import { and, count, eq, sql } from "drizzle-orm";
import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { stories } from "./stories";

export const storyLikes = mysqlTable('story_likes', {
    storyID: serial('story_id').notNull(),
    userID: varchar('user_id', { length: 255 }).notNull()
})

export type StoryLike = typeof storyLikes.$inferSelect
export type NewStoryLike = typeof storyLikes.$inferInsert


const storyAndUserIDsMatch = (storyID: number, userID: string) => {
    return and(eq(storyLikes.storyID, storyID), eq(storyLikes.userID, userID))
}

// BASIC CRUD
export async function likeStory(storyID: number, userID: string) {
    return db.insert(storyLikes).values({ storyID, userID })
}

export async function removeLike(storyID: number, userID: string) {
    return db.delete(storyLikes).where(storyAndUserIDsMatch(storyID, userID))
}

export async function checkIfLiked(storyID: number, userID: string) {
    return (await db.select().from(storyLikes).where(storyAndUserIDsMatch(storyID, userID))).length
}

export async function getLikeCount(storyID: number) {
    const [query] = await db.select({ count: count() }).from(storyLikes).where(eq(storyLikes.storyID, storyID))
    return query.count
}

export async function getLikesByUser(userID: string) {
    return db.select().from(storyLikes).leftJoin(stories, eq(stories.id, storyLikes.storyID)).where(eq(storyLikes.userID, userID))
}


export async function removeStoryLikes(storyID: number | string) {
    return db.delete(storyLikes).where(eq(storyLikes.storyID, Number(storyID)))
}
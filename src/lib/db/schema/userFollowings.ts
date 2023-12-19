import { db } from "$lib/services/database";
import { and, count, eq, sql } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { stories } from "./stories";

export const userFollowings = mysqlTable('user_followings', {
    followerID: varchar('follower_id', { length: 255 }).notNull(),
    followingID: varchar('follows_id', { length: 255 }).notNull()
})

export type UserFollowing = typeof userFollowings.$inferSelect;
export type NewUserFollowing = typeof userFollowings.$inferInsert

export async function newFollowing(followerID: string, followingID: string) {
    return db.insert(userFollowings).values({ followerID, followingID });
}

export async function checkIfFollowing(followerID: string, followingID: string) {
    return db.select({ count: sql<number>`count(follower_id)`.mapWith(Number) }).from(userFollowings).where(
        and(
            eq(userFollowings.followerID, followerID),
            eq(userFollowings.followingID, followingID)
        )
    )
}

export async function getUserFollowings(followerID: string) {
    return db.select().from(userFollowings).where(eq(userFollowings.followerID, followerID))
}

export async function getUserFollowers(followingID: string) {
    return db.select().from(userFollowings).where(eq(userFollowings.followingID, followingID))
}


export async function removeFollowing(followerID: string, followingID: string) {
    return db.delete(userFollowings).where(
        and(
            eq(userFollowings.followerID, followerID),
            eq(userFollowings.followingID, followingID)
        )
    )
}

export async function getFollowingFeed(followerID: string, limit = 8, offset = 0) {
    return await db
        .select()
        .from(userFollowings)
        .innerJoin(stories, eq(userFollowings.followingID, stories.authorId))
        .where(eq(userFollowings.followerID, followerID))
        .limit(limit)
        .offset(offset)
}

// COUNTS
export async function getFollowingFeedCount(followerID: string) {
    const [query] = await db
        .select({ count: count() })
        .from(userFollowings)
        .innerJoin(stories, eq(userFollowings.followingID, stories.authorId))
        .where(eq(userFollowings.followerID, followerID))

    return query.count
}

export async function getFollowerCount(followingID: string) {
    const [query] = await db
        .select({ count: count() })
        .from(userFollowings)
        .where(eq(userFollowings.followingID, followingID))

    return query.count
}
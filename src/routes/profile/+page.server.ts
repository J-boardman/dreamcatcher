import { getStoriesByAuthor, type Story } from "$lib/db/schema/stories.js";
import { getLikesByUser } from "$lib/db/schema/storyLikes.js";
import { getUserFollowers } from "$lib/db/schema/userFollowings.js";
import { clerk } from "$lib/services/clerk";
import type { StoryWithAuthor } from "$lib/types.js";
import type { User } from "@clerk/backend";

export async function load({ url, locals }) {
    const users = await clerk.users.getUserList();

    // @ts-ignore
    const { id, username, imageUrl } = users.find(item => item.id == locals.session.userId) as User
    const followingList = await getUserFollowers(id);
    const followers = followingList.map(item => {
        const {id, username, firstName, imageUrl } = users.find(user => user.id == item.followerID) as User
        return { id, username, firstName, imageUrl }
    })

    const followerCount = followingList.length

    const filter = url.searchParams.get("filter")

    let stories: StoryWithAuthor[] = []
    if (!filter) {
        stories = (await getStoriesByAuthor(id)).map(item => ({
            ...item,
            author: { id, username, imageUrl }
        }));
    } else if (filter == "liked") {
        stories = (await getLikesByUser(id)).map(item => item.stories).map(story => {
            const { id, username, imageUrl } = users.find(item => item.id == story?.authorId) as User
            return {
                ...story,
                author: { id, username, imageUrl }
            }
        })
    }

    return {
        user: { id, username, imageUrl },
        stories,
        followers,
        followerCount
    }
}
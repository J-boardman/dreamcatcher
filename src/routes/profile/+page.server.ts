import { getStoriesByAuthor, type Story } from "$lib/db/schema/stories.js";
import { getLikesByUser } from "$lib/db/schema/storyLikes.js";
import { clerk } from "$lib/services/clerk";
import type { StoryWithAuthor } from "$lib/types.js";
import type { User } from "@clerk/backend";

export async function load({ url, locals }) {
    // @ts-ignore
    const { id, username, imageUrl } = await clerk.users.getUser(locals.session.userId)

    const filter = url.searchParams.get("filter")
    const users = await clerk.users.getUserList();

    let stories: StoryWithAuthor[] = []
    if (!filter) {
        stories = (await getStoriesByAuthor(id)).map(item => ({
            ...item,
            author: { id, username, imageUrl }
        }));
    } else {
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
        stories
    }
}
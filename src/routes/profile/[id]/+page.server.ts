import { getStoriesByAuthor } from "$lib/db/schema/stories.js";
import { getLikesByUser } from "$lib/db/schema/storyLikes.js";
import { checkIfFollowing, getFollowerCount } from "$lib/db/schema/userFollowings.js";
import { clerk } from "$lib/services/clerk";
import type { StoryWithAuthor } from "$lib/types.js";
import type { User } from "@clerk/backend";

export async function load({ params, locals, url}) {

    const users = await clerk.users.getUserList();
    const user = users.find(item => item.id == params.id) as User
    const { id, username, imageUrl } = user
    
    const followerCount = await getFollowerCount(params.id)
    // @ts-expect-error
    const followedByUser = (await checkIfFollowing(locals.session.userId, params.id))[0].count;
    
    
    const filter = url.searchParams.get("filter")
    
    let stories: StoryWithAuthor[] = []
    if (!filter) {
        stories = (await getStoriesByAuthor(id)).map(item => ({
            ...item,
            author: { id, username, imageUrl }
        }));
    } else if(filter == "liked") {
        stories = (await getLikesByUser(id)).map(item => item.stories).map(story => {
            const { id, username, imageUrl } = users.find(item => item.id == story?.authorId) as User
            return {
                ...story,
                author: { id, username, imageUrl }
            }
        })
    }


    return {
        id: params.id,
        username,
        imageUrl,
        followerCount,
        followedByUser: followedByUser > 0,
        stories
    }
}
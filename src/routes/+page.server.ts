import { getSharedStories } from '$lib/db/schema/stories.js';
import { clerk } from '$lib/services/clerk.js';
import type { StoryWithAuthor } from '$lib/types.js';

export async function load({ url }) {
    const followingFeed = url.searchParams.get("following");

    const users = await clerk.users.getUserList();
    const stories = (await getSharedStories()).reverse();

    const storiesWithAuthor: StoryWithAuthor[] = stories.map(story => {
        const author = users.find(item => item.id == story.authorId);

        return {
            ...story,
            author: {
                username: author?.username,
                imageUrl: author?.imageUrl
            }
        }
    })
    console.log(storiesWithAuthor)

    return {
        stories: storiesWithAuthor,
    }
}
import { isFollowingFeed } from '$lib';
import { getSharedStories, type Story } from '$lib/db/schema/stories.js';
import { getFollowingFeed } from '$lib/db/schema/userFollowings.js';
import { clerk } from '$lib/services/clerk.js';
import type { StoryWithAuthor } from '$lib/types.js';

export async function load({ url, locals }) {
    const users = await clerk.users.getUserList();
    
    //@ts-expect-error
    const { userId } = locals.session

    let stories: Partial<Story>[];
    if (isFollowingFeed(url)) {
        const followingFeed = await getFollowingFeed(userId)
        stories = followingFeed.map(item => item.stories)
    } else {
        stories = await getSharedStories()
    }

    const storiesWithAuthor: StoryWithAuthor[] = stories.map(story => {
        const author = users.find(user => user.id == story.authorId);

        return {
            ...story,
            author: {
                username: author?.username,
                imageUrl: author?.imageUrl
            }
        }
    }).reverse()

    return { stories: storiesWithAuthor }
}
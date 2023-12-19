import { getSharedStories, type Story } from '$lib/db/schema/stories.js';
import { getFollowingFeed } from '$lib/db/schema/userFollowings.js';
import { clerk } from '$lib/services/clerk.js';
import type { StoryWithAuthor } from '$lib/types.js';

export async function load({ url, locals }) {
    
    const feed = url.searchParams.get("feed");
    const users = await clerk.users.getUserList();
    let stories: Partial<Story>[];
    if(feed == "following"){
        //@ts-ignore
        stories = (await getFollowingFeed(locals.session.userId)).map(item => {
            return item.stories
        })
    } else stories = await getSharedStories()

    const storiesWithAuthor: StoryWithAuthor[] = stories.map(story => {
        const author = users.find(item => item.id == story.authorId);

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
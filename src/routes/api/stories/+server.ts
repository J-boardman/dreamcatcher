import { getSharedStories, getSharedStoryCount, insertStory, type Story } from '$lib/db/schema/stories.js';
import { getFollowingFeed, getFollowingFeedCount } from '$lib/db/schema/userFollowings.js';
import { clerk } from '$lib/services/clerk.js';
import type { StoryWithAuthor } from '$lib/types.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const story = await request.json()
    const insertedStory = await insertStory(story);
    return json(insertedStory)
}

export async function GET({ url, locals }) {
    const offset = Number(url.searchParams.get("skip")) || 0
    const filter = url.searchParams.get("filter")
    //@ts-ignore
    const userId = locals.session.userId

    let stories: Partial<Story>[] = filter == "following"
        ? (await getFollowingFeed(userId)).map(item => item.stories)
        : await getSharedStories(offset)

    const users = await clerk.users.getUserList()
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

    return json({ stories: storiesWithAuthor })
}
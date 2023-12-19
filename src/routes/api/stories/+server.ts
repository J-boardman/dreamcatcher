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

export async function GET({ params, url, locals }) {

    const currentPage = Number(url.searchParams.get("skip")) || 0
    const feed = url.searchParams.get("feed")

    let stories: Partial<Story>[];
    let totalStories = 0;

    if (feed == "following") {
        //@ts-expect-error
        stories = (await getFollowingFeed(locals.session.userId)).map(item => item.stories)
        //@ts-expect-error
        totalStories = await getFollowingFeedCount(locals.sessions.userId)
    } else {
        stories = await getSharedStories(currentPage)
        totalStories = await getSharedStoryCount()
    }

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

    return json({ stories: storiesWithAuthor, totalStories })
}
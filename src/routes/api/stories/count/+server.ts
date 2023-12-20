import { isFollowingFeed } from '$lib';
import { getSharedStoryCount } from '$lib/db/schema/stories.js';
import { getFollowingFeedCount } from '$lib/db/schema/userFollowings.js';
import { json } from '@sveltejs/kit';

export async function GET({ url, locals }) {
    const storyCount = isFollowingFeed(url)
        //@ts-expect-error
        ? await getFollowingFeedCount(locals.session.userId)
        : await getSharedStoryCount()

    console.log(storyCount)
    return json({ storyCount })
}
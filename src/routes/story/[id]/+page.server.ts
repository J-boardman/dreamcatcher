import { getStoryById, type Story } from '$lib/db/schema/stories.js';
import { checkIfLiked, getLikeCount } from '$lib/db/schema/storyLikes.js';
import { clerk } from '$lib/services/clerk.js';
import { get } from 'svelte/store';

export async function load({ params, url, locals }) {
    const story: Story = (await getStoryById(Number(params.id)))[0];

    // @ts-ignore
    const userID = locals?.session.userId
    const { id, username, imageUrl } = await clerk.users.getUser(story.authorId)
    const likes = await getLikeCount(story.id)
    const likedByUser = await checkIfLiked(story.id, userID)
    console.log(likes)

    return {
        id: params.id,
        story,
        author: { id, username, imageUrl },
        liked: likedByUser ? true : false,
        likes
    }
}
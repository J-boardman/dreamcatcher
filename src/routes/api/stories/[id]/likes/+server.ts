import { getLikeCount, likeStory, removeLike } from '$lib/db/schema/storyLikes.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {
    const likes = await getLikeCount(Number(params.id))
    return json(likes)
}
export async function POST({ params, locals }) {
    //@ts-ignore
    const userID = locals.session.userId
    const result = await likeStory(Number(params.id), userID)
    return json(result)
}

export async function DELETE({ params, locals }) {
    //@ts-ignore
    const userID = locals.session.userId
    const result = await removeLike(Number(params.id), userID)
    return json(result)
}
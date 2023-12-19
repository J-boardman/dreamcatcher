import { getFollowerCount } from '$lib/db/schema/userFollowings.js';
import { json } from '@sveltejs/kit';

export async function GET({ params }) {

    const followerCount = await getFollowerCount(params.id)
    return json(followerCount)
}
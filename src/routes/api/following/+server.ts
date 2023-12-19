import { newFollowing, removeFollowing } from '$lib/db/schema/userFollowings.js'
import { json } from '@sveltejs/kit'

export async function POST({ request }) {
    const { follower, following } = await request.json()

    const newFollow = await newFollowing(follower, following)

    return json({
        following: newFollow.rowsAffected
    })
}

export async function DELETE({ request}){
    const { follower, following } = await request.json()
    const newFollow = await removeFollowing(follower, following)

    return json({
        following: newFollow.rowsAffected
    })
}
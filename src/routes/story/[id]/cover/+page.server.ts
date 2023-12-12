import { getStoryImage } from '$lib/db/schema/stories.js'

export async function load({ params, url }) {
    const imageUrl = await getStoryImage(Number(params.id))
    return {
        id: params.id,
        imageUrl: imageUrl[0].image
    }
}
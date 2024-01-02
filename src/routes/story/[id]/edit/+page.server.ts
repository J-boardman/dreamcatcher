import { getStoryById } from '$lib/db/schema/stories.js';
import { error } from '@sveltejs/kit';

export async function load({ params, locals }){
    const [story] = await getStoryById(Number(params.id))

    //@ts-expect-error
    if(locals.session.userId != story.authorId){
        throw error(403, "Forbidden")
    }

    return {}
}
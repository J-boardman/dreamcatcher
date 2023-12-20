import { getStoryById, updateStory } from '$lib/db/schema/stories.js';
import { json } from '@sveltejs/kit';

export async function PATCH({ params, locals, request }) {
    const { updatedStory } = await request.json()

    const result = await updateStory(Number(params.id), { ...updatedStory })


    return json({ updated: result.rowsAffected })
}

export async function DELETE({ params, locals }) {
    const story = await getStoryById(Number(params.id))

    return json({ story })
}

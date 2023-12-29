import { deleteStory, getStoryById, updateStory } from '$lib/db/schema/stories.js';
import { removeStoryLikes } from '$lib/db/schema/storyLikes.js';
import { json } from '@sveltejs/kit';

export async function PATCH({ params, locals, request }) {
    const data = await request.json()

    const result = await updateStory(params.id, { ...data })
    
    return json({ updated: result.rowsAffected })
}

export async function DELETE({ params }) {
    const deletedStory = await deleteStory(params.id)
    const removedLikes = await removeStoryLikes(params.id)

    return json({
        success: deletedStory.rowsAffected > 0,
        likesRemoved: removedLikes.rowsAffected > 0
    })
}

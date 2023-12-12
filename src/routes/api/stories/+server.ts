import { insertStory } from '$lib/db/schema/stories.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const story = await request.json()
    console.log(story);
    const insertedStory = await insertStory(story);
    return json(insertedStory)
}
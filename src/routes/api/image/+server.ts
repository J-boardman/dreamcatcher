import { openai } from '$lib/helpers/openai.js';

export const POST = async ({ request }) => {

    const { prompt } = await request.json();

    const image = await openai.images.generate({
        model: "dall-e-3",
        quality: "hd",
        prompt: prompt,
        size: "1024x1792",
    })

    return Response.json({
        url: image.data[0].url,
        created: new Date()
    })
}
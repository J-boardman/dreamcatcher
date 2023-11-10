import { openai } from '$lib/openai.js';

export const POST = async ({ request }) => {

    const { prompt } = await request.json();

    const image = await openai.images.generate({
        model: "dall-e-3",
        prompt: 
            + "A tall full length portrait aspect ratio oriented image 1792px high by 1024px wide. " 
            + "4k, detailed, trending in artstation, fantasy, studio ghibli, fairytale. " 
            + prompt,
        size: "1024x1792"
    })

    console.log(image.data[0].url)

    return Response.json({
        url: image.data[0].url
    })
}
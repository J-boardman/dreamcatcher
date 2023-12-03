import { cloudinaryUpload } from '$lib/services/cloudinary.js';

export const POST = async ({ request }) => {
    const { url } = await request.json();
    const upload = await cloudinaryUpload(url);
    console.log(upload)
    return Response.json(upload)
}
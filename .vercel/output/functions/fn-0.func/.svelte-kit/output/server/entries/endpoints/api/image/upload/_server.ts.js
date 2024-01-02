import { p as private_env } from "../../../../../chunks/shared-server.js";
import { v2 } from "cloudinary";
v2.config({
  cloud_name: private_env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: private_env.CLOUDINARY_API_KEY,
  api_secret: private_env.CLOUDINARY_API_SECRET
});
async function cloudinaryUpload(url) {
  return await v2.uploader.upload(url, {}, (error, result) => {
    return result;
  });
}
const POST = async ({ request }) => {
  const { url } = await request.json();
  const upload = await cloudinaryUpload(url);
  return Response.json(upload);
};
export {
  POST
};

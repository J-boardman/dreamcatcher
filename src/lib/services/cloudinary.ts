import { env } from "$env/dynamic/private"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: env.VITE_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
})

export async function cloudinaryUpload(url: string) {
    return await cloudinary.uploader.upload(url, {}, (error, result) => {
        return result
    });
}

export async function cloudinaryDelete(url: string){
    return await cloudinary.uploader.destroy(url, {}, (error, result) => {
        if(error) return error
        return result
    })
}
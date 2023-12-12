import { clerk } from '$lib/services/clerk.js'

export async function load({params}){
    const author = (await clerk.users.getUserList()).at(0)
    return {
        author: {
            id: author?.id,
            username: author?.username,
            imageUrl: author?.imageUrl
        }
    }
}
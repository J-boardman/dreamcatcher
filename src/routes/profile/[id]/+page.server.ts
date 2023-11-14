import { clerk } from "$lib/clerk";

export async function load({params}){
    const user = await clerk.users.getUser(params.id)
    const {username, imageUrl} = user

    return {
        id: params.id,
        username,
        imageUrl 
    }
}
import { clerk } from "$lib/clerk";

export async function load() {
    const users = await clerk.users.getUserList();
    const userList = users.map(user => ({ id: user.id, username: user.username, imageUrl: user.imageUrl }))

    return {
        userList
    }
}
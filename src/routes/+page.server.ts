import { clerk } from "$lib/services/clerk";
import type { User } from "@clerk/backend";

export async function load() {

    return {}
}

async function getUserList(): Promise<Partial<User>[]> {
    const users = await clerk.users.getUserList();
    return users?.map(user => ({ id: user.id, username: user.username, imageUrl: user.imageUrl }))
}
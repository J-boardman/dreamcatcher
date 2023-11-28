import { wait } from "$lib";
import { clerk } from "$lib/helpers/clerk";
import type { User } from "@clerk/backend";

export async function load() {

    return {
        streamed: {
            userList: new Promise(async (resolve, reject) => {
                resolve(getUserList())
            }) as Promise<Partial<User>[]>

        }
    }
}

async function getUserList(): Promise<Partial<User>[]> {
    const users = await clerk.users.getUserList();
    return users?.map(user => ({ id: user.id, username: user.username, imageUrl: user.imageUrl }))
}
import { page } from "$app/stores";
import { clerk } from "$lib/services/clerk";
import type { User } from "@clerk/backend";
import { get } from "svelte/store";

export async function load() {
    return {}
}

async function getUserList(): Promise<Partial<User>[]> {
    const users = await clerk.users.getUserList();
    return users?.map(user => ({ id: user.id, username: user.username, imageUrl: user.imageUrl }))
}
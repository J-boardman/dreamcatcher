import { clerk } from "$lib/services/clerk";
import { clerk as clerkClient } from "clerk-sveltekit/client";
import { setContext } from "svelte";
import { get } from "svelte/store";

export async function load(){
    const users = await clerk.users.getUserList();
    console.log(users)

    return {
        user: get(clerkClient)?.user
    }
}
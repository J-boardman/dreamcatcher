import { clerk } from "$lib/clerk";

async function getUsers(){
    try {
        const users = await clerk.users.getUserList();
        console.log(users)
    } catch (error) {
       console.log(error) 
    }
}

getUsers()
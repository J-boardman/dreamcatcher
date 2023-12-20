import { redirect } from '@sveltejs/kit';

export async function load({ url, locals }) {
    //@ts-expect-error
    if (locals.session?.userId) throw redirect(301, "/feed")
}
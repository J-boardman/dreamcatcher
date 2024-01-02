import { redirect } from '@sveltejs/kit';

export async function load({ url, locals }) {
    //@ts-expect-error
    if (locals.session?.userId) redirect(301, "/feed");
}
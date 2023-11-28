import { Clerk } from '@clerk/backend';
import { CLERK_SECRET_KEY } from '$env/static/private'

export const clerk = Clerk({ apiKey: CLERK_SECRET_KEY});
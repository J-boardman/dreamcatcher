import type { HandleClientError } from '@sveltejs/kit'
import { initializeClerkClient } from 'clerk-sveltekit'
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'
import { dark } from "@clerk/themes"

initializeClerkClient(PUBLIC_CLERK_PUBLISHABLE_KEY, {
	afterSignInUrl: '/profile/',
	afterSignUpUrl: '/profile/',
	signInUrl: '/sign-in',
	signUpUrl: '/sign-up',
    appearance: {baseTheme: dark}
})

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event)
}
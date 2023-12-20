import type { HandleClientError } from '@sveltejs/kit'
import { initializeClerkClient } from 'clerk-sveltekit'
import { PUBLIC_CLERK_PUBLISHABLE_KEY } from '$env/static/public'
import { dark } from "@clerk/themes"

initializeClerkClient(PUBLIC_CLERK_PUBLISHABLE_KEY, {
	afterSignInUrl: '/feed',
	afterSignUpUrl: '/feed',
	signInUrl: '/sign-in',
	signUpUrl: '/sign-up',
    appearance: {baseTheme: dark, variables: {colorPrimary: "#9048f7"}}
})

export const handleError: HandleClientError = async ({ error, event }) => {
	console.error(error, event)
}
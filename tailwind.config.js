/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
            aspectRatio: {
                '4/7': '4/7'
            }
        }

	},
	plugins: [require('daisyui')],
    daisyui: {
        themes: ["dracula"]
    }
};

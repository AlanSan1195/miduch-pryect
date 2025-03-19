/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors:{
				'rose': '#ec4899',
				'primary': '#161616',
				'secunday': '#1C1C1C'
			}
		},
	},
	plugins: [],
}

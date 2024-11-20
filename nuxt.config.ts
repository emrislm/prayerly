// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-04-03",
	devtools: { enabled: true },
	modules: ["@primevue/nuxt-module"],
	css: ["@/assets/tailwind.css", "@/assets/base.css"],
	primevue: {
		options: {
			theme: "none",
		},
	},
	postcss: {
		plugins: {
			"postcss-import": {},
			tailwindcss: {},
			autoprefixer: {},
		},
	},
});


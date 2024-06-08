import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			components: '/src/components/',
			hooks: '/src/hooks/',
			providers: '/src/providers/',
			services: '/src/services/',
			types: '/src/types/',
			store: '/src/store/',
		},
	},
})

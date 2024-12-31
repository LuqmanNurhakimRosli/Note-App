import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	plugins: [
		react()
	],
	build: {
		outDir: 'dist',
		sourcemap: true
	},
	server: {
		headers: {
			'Content-Security-Policy': "default-src 'self' https://*.firebaseapp.com https://*.googleapis.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://*.firebaseapp.com https://*.googleapis.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://*.firebaseio.com wss://*.firebaseio.com https://*.googleapis.com;"
		}
	}
})
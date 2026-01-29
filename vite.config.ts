import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	publicDir: 'public',
	build: {
		emptyOutDir: true,
		outDir: './build',
		chunkSizeWarningLimit: 500,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						return 'vendor'
					}
				},
			},
		},
	},
	server: {
		host: true,
	},
})

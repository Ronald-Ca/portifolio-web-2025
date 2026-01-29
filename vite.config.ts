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
					// Vendor principal - React e todas as libs que dependem dele
					if (id.includes('node_modules')) {
						// Icons separados por serem grandes
						if (id.includes('react-icons/fa6')) return 'icons-fa6'
						if (id.includes('react-icons/fa')) return 'icons-fa'
						if (id.includes('react-icons/io5')) return 'icons-io5'
						if (id.includes('react-icons/io')) return 'icons-io'
						if (id.includes('react-icons/si')) return 'icons-si'
						if (id.includes('react-icons/di')) return 'icons-di'
						if (id.includes('react-icons/bs')) return 'icons-bs'
						if (id.includes('react-icons/ri')) return 'icons-ri'
						if (id.includes('react-icons/md')) return 'icons-md'
						if (id.includes('react-icons/ai')) return 'icons-ai'
						if (id.includes('react-icons/bi')) return 'icons-bi'
						if (id.includes('react-icons/ci')) return 'icons-ci'
						if (id.includes('react-icons/cg')) return 'icons-cg'
						if (id.includes('react-icons/fi')) return 'icons-fi'
						if (id.includes('react-icons/fc')) return 'icons-fc'
						if (id.includes('react-icons/gi')) return 'icons-gi'
						if (id.includes('react-icons/go')) return 'icons-go'
						if (id.includes('react-icons/gr')) return 'icons-gr'
						if (id.includes('react-icons/hi2')) return 'icons-hi2'
						if (id.includes('react-icons/hi')) return 'icons-hi'
						if (id.includes('react-icons/im')) return 'icons-im'
						if (id.includes('react-icons/lia')) return 'icons-lia'
						if (id.includes('react-icons/lu')) return 'icons-lu'
						if (id.includes('react-icons/pi')) return 'icons-pi'
						if (id.includes('react-icons/rx')) return 'icons-rx'
						if (id.includes('react-icons/sl')) return 'icons-sl'
						if (id.includes('react-icons/tb')) return 'icons-tb'
						if (id.includes('react-icons/tfi')) return 'icons-tfi'
						if (id.includes('react-icons/ti')) return 'icons-ti'
						if (id.includes('react-icons/vsc')) return 'icons-vsc'
						if (id.includes('react-icons/wi')) return 'icons-wi'
						if (id.includes('react-icons')) return 'icons-lib'
						if (id.includes('lucide-react')) return 'icons-lucide'
						// Todas as outras dependências juntas
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

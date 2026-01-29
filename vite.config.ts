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
					// React core + bibliotecas que dependem diretamente do React
					// Agrupados para garantir ordem de carregamento correta
					if (
						id.includes('node_modules/react/') ||
						id.includes('node_modules/react-dom/') ||
						id.includes('@tanstack/react-query') ||
						id.includes('node_modules/react-router')
					) {
						return 'vendor-react'
					}
					// Radix UI - split by component
					if (id.includes('@radix-ui')) {
						return 'vendor-radix'
					}
					// Motion/Framer Motion
					if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
						return 'vendor-motion'
					}
					// Lucide icons
					if (id.includes('node_modules/lucide-react')) {
						return 'vendor-lucide'
					}
					// Form utilities
					if (id.includes('react-hook-form') || id.includes('node_modules/zod') || id.includes('@hookform')) {
						return 'vendor-form'
					}
					// Axios
					if (id.includes('node_modules/axios')) {
						return 'vendor-axios'
					}
					// Embla carousel
					if (id.includes('embla-carousel')) {
						return 'vendor-carousel'
					}
					// Utility libraries
					if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
						return 'vendor-utils'
					}
					// React Icons - cada biblioteca em chunk separado
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
				},
			},
		},
	},
	server: {
		host: true,
	},
})

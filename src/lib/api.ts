import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { env } from './env'

const api = axios.create({
	baseURL: env.VITE_API_URL,
	timeout: 10000,
})

api.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		const authData = localStorage.getItem('auth')
		if (authData) {
			try {
				const { token } = JSON.parse(authData)
				if (token && config.headers) {
					config.headers.Authorization = `Bearer ${token}`
				}
			} catch (error) {
				console.error('Error parsing auth data:', error)
			}
		}
		return config
	},
	(error: AxiosError) => {
		return Promise.reject(error)
	}
)

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError) => {
		if (error.response) {
			const status = error.response.status

			if (status === 401) {
				localStorage.removeItem('auth')
				const currentPath = window.location.pathname
				if (!currentPath.includes('/login')) {
					window.location.href = '/login'
				}
			}

			if (status === 429) {
				const errorMessage =
					error.response.data && typeof error.response.data === 'object' && 'mensagem' in error.response.data
						? (error.response.data as { mensagem: string }).mensagem
						: 'Muitas requisições. Tente novamente mais tarde.'

				return Promise.reject({
					...error,
					message: errorMessage,
				})
			}

			if (status >= 500) {
				return Promise.reject({
					...error,
					message: 'Erro no servidor. Tente novamente mais tarde.',
				})
			}
		}

		if (error.code === 'ECONNABORTED') {
			return Promise.reject({
				...error,
				message: 'Tempo de requisição expirado. Verifique sua conexão.',
			})
		}

		if (!error.response) {
			return Promise.reject({
				...error,
				message: 'Erro de conexão. Verifique sua internet.',
			})
		}

		return Promise.reject(error)
	}
)

export default api

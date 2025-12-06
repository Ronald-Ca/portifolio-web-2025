import { z } from 'zod'

const envSchema = z.object({
	VITE_API_URL: z.string().url('VITE_API_URL deve ser uma URL válida'),
})

type Env = z.infer<typeof envSchema>

export function validateEnv(): Env {
	try {
		const env = {
			VITE_API_URL: import.meta.env.VITE_API_URL,
		}

		return envSchema.parse(env)
	} catch (error) {
		if (error instanceof z.ZodError) {
			const missingVars = error.errors.map((err) => err.path.join('.')).join(', ')
			throw new Error(
				`❌ Variáveis de ambiente inválidas ou faltando: ${missingVars}\n` +
					'Por favor, verifique seu arquivo .env'
			)
		}
		throw error
	}
}

export const env = validateEnv()


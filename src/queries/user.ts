import { DefaultReturnType } from '../lib/base-service'
import UserService, { UserLoginResponseType, UserLoginType } from '../services/user-service'
import { useMutation } from '@tanstack/react-query'

const user = new UserService()

type MutationOptions = {
	onSuccess?: (data: DefaultReturnType<UserLoginResponseType>) => void
	onError?: (error: Error) => void
}

const useAuthenticateMutation = (options?: MutationOptions) => {
	return useMutation({
		mutationFn: async (data: UserLoginType) => await user.authenticate(data),
		onSuccess: (data) => {
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

export { useAuthenticateMutation }

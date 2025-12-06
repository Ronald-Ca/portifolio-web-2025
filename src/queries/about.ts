import { DefaultReturnType } from '../lib/base-service'
import AboutService, { AboutType } from '../services/about-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

const about = new AboutService()

type MutationOptions = {
	onSuccess?: (data: DefaultReturnType<AboutType>) => void
	onError?: (error: Error) => void
}

const useGetAboutQuery = () => {
	return useQuery({
		queryKey: queryKeys.about.detail(),
		queryFn: () => about.getAbout(),
	})
}

const useCreateAboutMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: AboutType) => await about.createAbout(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.about.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

const useUpdateAboutMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: AboutType) => await about.updateAbout(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.about.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

export { useGetAboutQuery, useCreateAboutMutation, useUpdateAboutMutation }

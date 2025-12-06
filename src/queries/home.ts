import { DefaultReturnType } from '../lib/base-service'
import HomeService, { HomeType } from '../services/home-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

const home = new HomeService()

type MutationOptions = {
	onSuccess?: (data: DefaultReturnType<HomeType>) => void
	onError?: (error: Error) => void
}

const useGetHomeQuery = () => {
	return useQuery({
		queryKey: queryKeys.home.detail(),
		queryFn: () => home.getHome(),
	})
}

const useCreateHomeMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: HomeType) => await home.createHome(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.home.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

const useUpdateHomeMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: HomeType) => await home.updateHome(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.home.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

export { useGetHomeQuery, useCreateHomeMutation, useUpdateHomeMutation }

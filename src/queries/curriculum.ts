import { DefaultReturnType } from '../lib/base-service'
import CurriculumService, { CurriculumType } from '../services/curriculum-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

const curriculum = new CurriculumService()

type MutationOptions = {
	onSuccess?: (data: DefaultReturnType<CurriculumType>) => void
	onError?: (error: Error) => void
}

const useGetCurriculumQuery = () => {
	return useQuery({
		queryKey: queryKeys.curriculum.detail(),
		queryFn: () => curriculum.getCurriculum(),
	})
}

const useCreateCurriculumMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: CurriculumType) => await curriculum.createCurriculum(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.curriculum.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

const useUpdateCurriculumMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: CurriculumType) => await curriculum.updateCurriculum(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.curriculum.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

export { useGetCurriculumQuery, useCreateCurriculumMutation, useUpdateCurriculumMutation }

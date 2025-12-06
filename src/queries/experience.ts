import { DefaultReturnType } from '../lib/base-service'
import ExperienceService, { ExperienceType } from '../services/experience-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

const experience = new ExperienceService()

type MutationOptions = {
	onSuccess?: (data: DefaultReturnType<ExperienceType>) => void
	onError?: (error: Error) => void
}

const useGetExperienceQuery = () => {
	return useQuery({
		queryKey: queryKeys.experience.list(),
		queryFn: () => experience.getAll(),
	})
}

const useCreateExperienceMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: ExperienceType) => await experience.create(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.experience.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

const useUpdateExperienceMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: ExperienceType) => await experience.update(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.experience.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

export { useGetExperienceQuery, useCreateExperienceMutation, useUpdateExperienceMutation }

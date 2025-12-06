import { DefaultReturnType } from '../lib/base-service'
import EducationService, { EducationType } from '../services/education-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

const education = new EducationService()

type MutationOptions = {
	onSuccess?: (data: DefaultReturnType<EducationType>) => void
	onError?: (error: Error) => void
}

const useGetEducationQuery = () => {
	return useQuery({
		queryKey: queryKeys.education.list(),
		queryFn: () => education.getEducation(),
	})
}

const useCreateEducationMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: EducationType) => await education.createEducation(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.education.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

const useUpdateEducationMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: EducationType) => await education.updateEducation(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.education.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

export { useGetEducationQuery, useCreateEducationMutation, useUpdateEducationMutation }

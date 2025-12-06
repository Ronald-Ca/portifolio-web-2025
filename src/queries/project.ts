import { DefaultReturnType } from '../lib/base-service'
import ProjectsService, { ProjectType } from '../services/project-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

const project = new ProjectsService()

type MutationOptions = {
	onSuccess?: (data: DefaultReturnType<ProjectType>) => void
	onError?: (error: Error) => void
}

const useGetProjectsQuery = () => {
	return useQuery({
		queryKey: queryKeys.project.list(),
		queryFn: () => project.getAll(),
	})
}

const useCreateProjectMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: ProjectType) => await project.create(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.project.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

const useUpdateProjectMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: ProjectType) => await project.update(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.project.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

export { useGetProjectsQuery, useCreateProjectMutation, useUpdateProjectMutation }

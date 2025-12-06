import { DefaultReturnType } from '../lib/base-service'
import SkillService, { SkillType } from '../services/skill-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

const skill = new SkillService()

type MutationOptions = {
	onSuccess?: (data: DefaultReturnType<SkillType>) => void
	onError?: (error: Error) => void
}

const useGetSkillsQuery = () => {
	return useQuery({
		queryKey: queryKeys.skill.list(),
		queryFn: () => skill.getSkills(),
	})
}

const useCreateSkillMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: SkillType) => await skill.createSkill(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.skill.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

const useUpdateSkillMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: SkillType) => await skill.updateSkill(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.skill.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

export { useGetSkillsQuery, useCreateSkillMutation, useUpdateSkillMutation }

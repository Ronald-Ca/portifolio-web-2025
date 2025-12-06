import { DefaultReturnType } from '../lib/base-service'
import SocialMediaService, { SocialMediaType } from '../services/social-media-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from './query-keys'

const socialMedia = new SocialMediaService()

type MutationOptions = {
	onSuccess?: (data: DefaultReturnType<SocialMediaType>) => void
	onError?: (error: Error) => void
}

const useGetSocialMediaQuery = () => {
	return useQuery({
		queryKey: queryKeys.socialMedia.list(),
		queryFn: () => socialMedia.getAll(),
	})
}

const useCreateSocialMediaMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: SocialMediaType) => await socialMedia.create(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.socialMedia.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

const useUpdateSocialMediaMutation = (options?: MutationOptions) => {
	const queryClient = useQueryClient()
	
	return useMutation({
		mutationFn: async (data: SocialMediaType) => await socialMedia.update(data),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: queryKeys.socialMedia.all })
			options?.onSuccess?.(data)
		},
		onError: (error) => {
			options?.onError?.(error as Error)
		},
	})
}

export { useGetSocialMediaQuery, useCreateSocialMediaMutation, useUpdateSocialMediaMutation }

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cardApi } from '../api/card.api'

export const useCreateCard = (boardId: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: cardApi.create,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['board', boardId] })
		}
	})
}

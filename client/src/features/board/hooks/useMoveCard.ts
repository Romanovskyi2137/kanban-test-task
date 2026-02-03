import { useMutation, useQueryClient } from '@tanstack/react-query'

import apiClient from '@api/client'

interface MoveCardParams {
	cardId: number
	targetColumnId: number
	newOrder: number
}

export const useMoveCard = (boardId: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (params: MoveCardParams) => {
			return apiClient.patch(`/cards/${params.cardId}/move`, params)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['board', boardId] })
		},
		onError: error => {
			console.error('Failed to move card:', error)
			alert('Помилка при переміщенні картки!')
		}
	})
}

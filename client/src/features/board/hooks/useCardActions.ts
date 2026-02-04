import { useMutation, useQueryClient } from '@tanstack/react-query'

import { cardApi } from '../api/card.api'

interface UpdateCardVariables {
	id: number
	data: {
		title?: string
		description?: string | null
	}
}

export const useCardActions = (boardId: string) => {
	const queryClient = useQueryClient()
	const queryKey = ['board', boardId]

	const updateMutation = useMutation({
		mutationFn: (variables: UpdateCardVariables) => {
			const { title, description } = variables.data

			return cardApi.update(variables.id, {
				title,
				description: description ?? undefined
			})
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey })
		}
	})

	const deleteMutation = useMutation({
		mutationFn: (cardId: number) => {
			return cardApi.delete(cardId)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey })
		}
	})

	return { updateCard: updateMutation, deleteCard: deleteMutation }
}

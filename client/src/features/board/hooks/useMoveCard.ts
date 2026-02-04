import { type Board, type Card } from '@app-types/kanban'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import apiClient from '@api/client'

export const useMoveCard = (boardId: string) => {
	const queryClient = useQueryClient()
	const queryKey = ['board', boardId]

	return useMutation({
		mutationFn: async (params: {
			cardId: number
			targetColumnId: number
			newOrder: number
		}) => {
			return apiClient.patch(`/cards/${params.cardId}/move`, params)
		},

		onMutate: async newMove => {
			await queryClient.cancelQueries({ queryKey })

			const previousBoard = queryClient.getQueryData<Board>(queryKey)

			queryClient.setQueryData<Board>(queryKey, old => {
				if (!old) {
					return old
				}

				const newColumns = [...old.columns]

				let movedCard: Card | null = null
				for (const column of newColumns) {
					const cardIndex = column.cards.findIndex(cardItem => {
						return cardItem.id === newMove.cardId
					})
					if (cardIndex !== -1) {
						;[movedCard] = column.cards.splice(cardIndex, 1)
						break
					}
				}

				if (!movedCard) {
					return old
				}

				const targetCol = newColumns.find(column => {
					return column.id === newMove.targetColumnId
				})
				if (targetCol) {
					movedCard.columnId = newMove.targetColumnId
					movedCard.order = newMove.newOrder
					targetCol.cards.splice(newMove.newOrder - 1, 0, movedCard)

					targetCol.cards.forEach((card, index) => {
						card.order = index + 1
					})
				}

				return { ...old, columns: newColumns }
			})

			return { previousBoard }
		},

		onError: (error, newMove, context) => {
			if (context?.previousBoard) {
				queryClient.setQueryData(queryKey, context.previousBoard)
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey })
		}
	})
}

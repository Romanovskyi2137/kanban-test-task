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

				let movedCard: Card | null = null
				let sourceColumnId: number | null = null

				for (const column of old.columns) {
					const card = column.cards.find(card => card.id === newMove.cardId)
					if (card) {
						movedCard = card
						sourceColumnId = column.id
						break
					}
				}

				if (!movedCard) {
					return old
				}

				const updatedCard: Card = {
					...movedCard,
					columnId: newMove.targetColumnId,
					order: newMove.newOrder
				}

				const newColumns = old.columns.map(column => {
					const isSameColumn = sourceColumnId === newMove.targetColumnId

					if (isSameColumn && column.id === sourceColumnId) {
						const without = column.cards.filter(
							card => card.id !== newMove.cardId
						)
						without.splice(newMove.newOrder - 1, 0, updatedCard)
						return {
							...column,
							cards: without.map((item, i) => ({ ...item, order: i + 1 }))
						}
					}

					if (column.id === sourceColumnId) {
						return {
							...column,
							cards: column.cards
								.filter(card => card.id !== newMove.cardId)
								.map((item, i) => ({ ...item, order: i + 1 }))
						}
					}

					if (column.id === newMove.targetColumnId) {
						const withInserted = [...column.cards]
						withInserted.splice(newMove.newOrder - 1, 0, updatedCard)
						return {
							...column,
							cards: withInserted.map((item, i) => ({ ...item, order: i + 1 }))
						}
					}

					return column
				})

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

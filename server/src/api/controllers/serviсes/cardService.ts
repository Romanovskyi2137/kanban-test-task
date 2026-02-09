import { prisma } from '../../../lib/prisma.js'

export const createCard = async (
	title: string,
	description: string | undefined,
	columnId: number
) => {
	// Get the highest order value to place the new card at the end
	const lastCard = await prisma.card.findFirst({
		where: { columnId },
		orderBy: { order: 'desc' }
	})

	const nextOrder = lastCard ? lastCard.order + 1 : 1

	return await prisma.card.create({
		data: {
			title,
			description: description ?? null,
			columnId,
			order: nextOrder
		}
	})
}

export const updateCard = async (
	id: number,
	data: { title?: string; description?: string }
) => {
	return await prisma.card.update({
		where: { id },
		data
	})
}

export const deleteCard = async (id: number) => {
	return await prisma.card.delete({
		where: { id }
	})
}

/**
 * Handles complex drag-and-drop logic
 * Supports moving between columns and reordering
 */

export const moveCard = async (
	cardId: number,
	targetColumnId: number,
	newOrder: number
) => {
	return await prisma.$transaction(async tx => {
		const card = await tx.card.findUnique({ where: { id: cardId } })
		if (!card) {
			throw new Error('Card not found')
		}
		const oldColumnId = card.columnId
		const oldOrder = card.order

		if (oldColumnId === targetColumnId) {
			// Reordering within the same column
			if (newOrder > oldOrder) {
				// Moving down: shift cards between old and new positions up
				await tx.card.updateMany({
					where: {
						columnId: oldColumnId,
						order: { gt: oldOrder, lte: newOrder }
					},
					data: { order: { decrement: 1 } }
				})
			} else if (newOrder < oldOrder) {
				// Moving up: shift cards between new and old positions down
				await tx.card.updateMany({
					where: {
						columnId: oldColumnId,
						order: { gte: newOrder, lt: oldOrder }
					},
					data: { order: { increment: 1 } }
				})
			}
		} else {
			// Moving to a different column
			// 1. Close the gap in the source column
			await tx.card.updateMany({
				where: { columnId: oldColumnId, order: { gt: oldOrder } },
				data: { order: { decrement: 1 } }
			})

			// 2. Make space in the destination column
			await tx.card.updateMany({
				where: { columnId: targetColumnId, order: { gte: newOrder } },
				data: { order: { increment: 1 } }
			})
		}

		// Final step: update the dragged card's position and column
		return await tx.card.update({
			where: { id: cardId },
			data: {
				columnId: targetColumnId,
				order: newOrder
			}
		})
	})
}

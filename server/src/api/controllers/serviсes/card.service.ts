import { prisma } from '@/lib/prisma'

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

		// Simple update for MVP, complex reordering logic can be added here
		return await tx.card.update({
			where: { id: cardId },
			data: {
				columnId: targetColumnId,
				order: newOrder
			}
		})
	})
}

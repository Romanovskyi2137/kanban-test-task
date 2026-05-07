import { HttpError } from '../../../errors.js'
import { prisma } from '../../../lib/prisma.js'

const parsePositiveInt = (value: unknown, field: string): number => {
	const num = Number(value)
	if (!Number.isInteger(num) || num <= 0) {
		throw new HttpError(400, `${field} must be a positive integer`)
	}
	return num
}

export const createCard = async (
	title: unknown,
	description: unknown,
	columnId: unknown
) => {
	if (!title || typeof title !== 'string') {
		throw new HttpError(400, 'Title is required')
	}
	const parsedColumnId = parsePositiveInt(columnId, 'columnId')

	return await prisma.$transaction(async tx => {
		const lastCard = await tx.card.findFirst({
			where: { columnId: parsedColumnId },
			orderBy: { order: 'desc' }
		})
		const nextOrder = lastCard ? lastCard.order + 1 : 1
		return await tx.card.create({
			data: {
				title,
				description: typeof description === 'string' ? description : null,
				columnId: parsedColumnId,
				order: nextOrder
			}
		})
	})
}

export const updateCard = async (
	rawId: string,
	fields: { title?: unknown; description?: unknown }
) => {
	const id = parsePositiveInt(rawId, 'id')
	const data: { title?: string; description?: string | null } = {}

	if (fields.title !== undefined) {
		if (typeof fields.title !== 'string' || !fields.title.trim()) {
			throw new HttpError(400, 'title must be a non-empty string')
		}
		data.title = fields.title
	}

	if (fields.description !== undefined) {
		data.description =
			typeof fields.description === 'string' ? fields.description : null
	}

	return await prisma.card.update({ where: { id }, data })
}

export const deleteCard = async (rawId: string) => {
	const id = parsePositiveInt(rawId, 'id')
	return await prisma.card.delete({ where: { id } })
}

export const moveCard = async (
	rawId: string,
	rawTargetColumnId: unknown,
	rawNewOrder: unknown
) => {
	const cardId = parsePositiveInt(rawId, 'id')
	const targetColumnId = parsePositiveInt(rawTargetColumnId, 'targetColumnId')
	const newOrder = parsePositiveInt(rawNewOrder, 'newOrder')

	return await prisma.$transaction(async tx => {
		const card = await tx.card.findUnique({ where: { id: cardId } })
		if (!card) {
			throw new HttpError(404, 'Card not found')
		}

		const oldColumnId = card.columnId
		const oldOrder = card.order

		if (oldColumnId === targetColumnId) {
			if (newOrder > oldOrder) {
				await tx.card.updateMany({
					where: {
						columnId: oldColumnId,
						order: { gt: oldOrder, lte: newOrder }
					},
					data: { order: { decrement: 1 } }
				})
			} else if (newOrder < oldOrder) {
				await tx.card.updateMany({
					where: {
						columnId: oldColumnId,
						order: { gte: newOrder, lt: oldOrder }
					},
					data: { order: { increment: 1 } }
				})
			}
		} else {
			await tx.card.updateMany({
				where: { columnId: oldColumnId, order: { gt: oldOrder } },
				data: { order: { decrement: 1 } }
			})
			await tx.card.updateMany({
				where: { columnId: targetColumnId, order: { gte: newOrder } },
				data: { order: { increment: 1 } }
			})
		}

		return await tx.card.update({
			where: { id: cardId },
			data: { columnId: targetColumnId, order: newOrder }
		})
	})
}

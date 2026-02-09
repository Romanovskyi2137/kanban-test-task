import { beforeEach, describe, expect, it, vi } from 'vitest'

import { prisma } from '../../../lib/prisma'
import * as cardService from './cardService'

vi.mock('@/lib/prisma', () => ({
	prisma: {
		card: {
			findFirst: vi.fn(),
			create: vi.fn(),
			update: vi.fn(),
			delete: vi.fn()
		},
		$transaction: vi.fn(callback => callback(prisma))
	}
}))

describe('Card Service', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should create a card and increment the order', async () => {
		const existingCard = { id: 1, title: 'Task 1', order: 5, columnId: 10 }
		const newCardData = { title: 'Task 2', description: 'Desc', columnId: 10 }

		// eslint-disable-next-line
		// @ts-ignore
		prisma.card.findFirst.mockResolvedValue(existingCard)
		// eslint-disable-next-line
		// @ts-ignore
		prisma.card.create.mockResolvedValue({ id: 2, ...newCardData, order: 6 })

		const result = await cardService.createCard(
			newCardData.title,
			newCardData.description,
			10
		)

		expect(result.order).toBe(6)
		expect(prisma.card.create).toHaveBeenCalledWith({
			data: expect.objectContaining({ order: 6 })
		})
	})

	it('should update card details', async () => {
		const updateData = { title: 'Updated Task' }
		// eslint-disable-next-line
		// @ts-ignore
		prisma.card.update.mockResolvedValue({ id: 1, ...updateData })

		const result = await cardService.updateCard(1, updateData)

		expect(result.title).toBe('Updated Task')
		expect(prisma.card.update).toHaveBeenCalledWith({
			where: { id: 1 },
			data: updateData
		})
	})

	it('should handle card movement within transaction', async () => {
		const moveData = { id: 1, targetColumnId: 2, newOrder: 3 }
		// eslint-disable-next-line
		// @ts-ignore
		prisma.card.findUnique = vi.fn().mockResolvedValue({ id: 1 })
		// eslint-disable-next-line
		// @ts-ignore
		prisma.card.update.mockResolvedValue({ id: 1, columnId: 2, order: 3 })

		const result = await cardService.moveCard(
			moveData.id,
			moveData.targetColumnId,
			moveData.newOrder
		)

		expect(result.columnId).toBe(2)
		expect(prisma.card.update).toHaveBeenCalledWith({
			where: { id: 1 },
			data: { columnId: 2, order: 3 }
		})
	})

	it('should delete a card', async () => {
		// eslint-disable-next-line
		// @ts-ignore
		prisma.card.delete.mockResolvedValue({ id: 1 })

		await cardService.deleteCard(1)

		expect(prisma.card.delete).toHaveBeenCalledWith({
			where: { id: 1 }
		})
	})
})

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { HttpError } from '../../../errors'
import { prisma } from '../../../lib/prisma'
import * as cardService from './cardService'

vi.mock('../../../lib/prisma', () => ({
	prisma: {
		card: {
			findFirst: vi.fn(),
			findUnique: vi.fn(),
			create: vi.fn(),
			update: vi.fn(),
			updateMany: vi.fn(),
			delete: vi.fn()
		},
		$transaction: vi.fn(callback => callback(prisma))
	}
}))

describe('Card Service', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	describe('createCard', () => {
		it('should create a card at the next order position', async () => {
			const existingCard = {
				id: 1,
				title: 'Task 1',
				order: 5,
				columnId: 10,
				description: null
			}
			vi.mocked(prisma.card.findFirst).mockResolvedValue(existingCard)
			vi.mocked(prisma.card.create).mockResolvedValue({
				id: 2,
				title: 'Task 2',
				description: 'Desc',
				columnId: 10,
				order: 6
			})

			const result = await cardService.createCard('Task 2', 'Desc', 10)

			expect(result.order).toBe(6)
			expect(prisma.card.create).toHaveBeenCalledWith({
				data: expect.objectContaining({ order: 6 })
			})
		})

		it('should start order at 1 when the column is empty', async () => {
			vi.mocked(prisma.card.findFirst).mockResolvedValue(null)
			vi.mocked(prisma.card.create).mockResolvedValue({
				id: 1,
				title: 'First',
				description: null,
				columnId: 10,
				order: 1
			})

			await cardService.createCard('First', undefined, 10)

			expect(prisma.card.create).toHaveBeenCalledWith({
				data: expect.objectContaining({ order: 1 })
			})
		})

		it('should throw 400 when title is missing', async () => {
			await expect(cardService.createCard('', undefined, 1)).rejects.toThrow(
				HttpError
			)
			await expect(cardService.createCard(null, undefined, 1)).rejects.toThrow(
				HttpError
			)
		})

		it('should throw 400 when columnId is invalid', async () => {
			await expect(
				cardService.createCard('Title', undefined, 'abc')
			).rejects.toThrow(HttpError)
			await expect(
				cardService.createCard('Title', undefined, -1)
			).rejects.toThrow(HttpError)
		})
	})

	describe('updateCard', () => {
		it('should update card details', async () => {
			vi.mocked(prisma.card.update).mockResolvedValue({
				id: 1,
				title: 'Updated Task',
				description: null,
				order: 1,
				columnId: 1
			})

			const result = await cardService.updateCard('1', {
				title: 'Updated Task'
			})

			expect(result.title).toBe('Updated Task')
			expect(prisma.card.update).toHaveBeenCalledWith({
				where: { id: 1 },
				data: { title: 'Updated Task' }
			})
		})

		it('should throw 400 when id is invalid', async () => {
			await expect(
				cardService.updateCard('abc', { title: 'x' })
			).rejects.toThrow(HttpError)
		})
	})

	describe('moveCard', () => {
		it('should move a card to a different column and shift orders correctly', async () => {
			const card = {
				id: 1,
				title: 'Task',
				description: null,
				columnId: 1,
				order: 2
			}
			vi.mocked(prisma.card.findUnique).mockResolvedValue(card)
			vi.mocked(prisma.card.updateMany).mockResolvedValue({ count: 1 })
			vi.mocked(prisma.card.update).mockResolvedValue({
				...card,
				columnId: 2,
				order: 1
			})

			const result = await cardService.moveCard('1', 2, 1)

			expect(prisma.card.updateMany).toHaveBeenCalledWith({
				where: { columnId: 1, order: { gt: 2 } },
				data: { order: { decrement: 1 } }
			})
			expect(prisma.card.updateMany).toHaveBeenCalledWith({
				where: { columnId: 2, order: { gte: 1 } },
				data: { order: { increment: 1 } }
			})
			expect(result.columnId).toBe(2)
			expect(result.order).toBe(1)
		})

		it('should reorder a card downward within the same column', async () => {
			const card = {
				id: 1,
				title: 'Task',
				description: null,
				columnId: 1,
				order: 1
			}
			vi.mocked(prisma.card.findUnique).mockResolvedValue(card)
			vi.mocked(prisma.card.updateMany).mockResolvedValue({ count: 1 })
			vi.mocked(prisma.card.update).mockResolvedValue({ ...card, order: 3 })

			await cardService.moveCard('1', 1, 3)

			expect(prisma.card.updateMany).toHaveBeenCalledWith({
				where: { columnId: 1, order: { gt: 1, lte: 3 } },
				data: { order: { decrement: 1 } }
			})
			expect(prisma.card.updateMany).toHaveBeenCalledTimes(1)
		})

		it('should reorder a card upward within the same column', async () => {
			const card = {
				id: 1,
				title: 'Task',
				description: null,
				columnId: 1,
				order: 3
			}
			vi.mocked(prisma.card.findUnique).mockResolvedValue(card)
			vi.mocked(prisma.card.updateMany).mockResolvedValue({ count: 1 })
			vi.mocked(prisma.card.update).mockResolvedValue({ ...card, order: 1 })

			await cardService.moveCard('1', 1, 1)

			expect(prisma.card.updateMany).toHaveBeenCalledWith({
				where: { columnId: 1, order: { gte: 1, lt: 3 } },
				data: { order: { increment: 1 } }
			})
			expect(prisma.card.updateMany).toHaveBeenCalledTimes(1)
		})

		it('should throw 404 when the card does not exist', async () => {
			vi.mocked(prisma.card.findUnique).mockResolvedValue(null)

			await expect(cardService.moveCard('99', 1, 1)).rejects.toThrow(HttpError)
		})

		it('should throw 400 when parameters are invalid', async () => {
			await expect(cardService.moveCard('abc', 1, 1)).rejects.toThrow(HttpError)
			await expect(cardService.moveCard('1', 'bad', 1)).rejects.toThrow(
				HttpError
			)
		})
	})

	describe('deleteCard', () => {
		it('should delete a card', async () => {
			vi.mocked(prisma.card.delete).mockResolvedValue({
				id: 1,
				title: 'Task',
				description: null,
				order: 1,
				columnId: 1
			})

			await cardService.deleteCard('1')

			expect(prisma.card.delete).toHaveBeenCalledWith({ where: { id: 1 } })
		})

		it('should throw 400 when id is invalid', async () => {
			await expect(cardService.deleteCard('abc')).rejects.toThrow(HttpError)
		})
	})
})

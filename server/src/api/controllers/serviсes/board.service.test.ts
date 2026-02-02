import { describe, expect, it, vi } from 'vitest'

import { prisma } from '@/lib/prisma'

import * as boardService from './board.service'

vi.mock('@/lib/prisma', () => ({
	prisma: {
		board: {
			findMany: vi.fn(),
			create: vi.fn()
		}
	}
}))

describe('Board Service', () => {
	it('should return all boards', async () => {
		const mockBoards = [{ id: '1', name: 'Test Board', createdAt: new Date() }]
		// eslint-disable-next-line
		// @ts-ignore
		prisma.board.findMany.mockResolvedValue(mockBoards)

		const result = await boardService.getAllBoards()

		expect(result).toEqual(mockBoards)
		expect(prisma.board.findMany).toHaveBeenCalled()
	})

	it('should create a new board', async () => {
		const boardData = { name: 'New Board' }
		const mockCreatedBoard = {
			id: 'uuid-123',
			...boardData,
			createdAt: new Date()
		}
		// eslint-disable-next-line
		// @ts-ignore
		prisma.board.create.mockResolvedValue(mockCreatedBoard)

		const result = await boardService.createBoard(boardData.name)

		expect(result.name).toBe(boardData.name)
		expect(prisma.board.create).toHaveBeenCalledWith({
			data: { name: boardData.name }
		})
	})
})

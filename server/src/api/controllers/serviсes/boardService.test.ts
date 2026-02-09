import { describe, expect, it, vi } from 'vitest'

import { prisma } from '../../../lib/prisma'
import * as boardService from './boardService'

vi.mock('@/lib/prisma', () => ({
	prisma: {
		board: {
			findMany: vi.fn(),
			create: vi.fn()
		}
	}
}))

describe('Board Service', () => {
	const DEFAULT_COLUMNS = [
		{ title: 'To Do', order: 1 },
		{ title: 'In Progress', order: 2 },
		{ title: 'Done', order: 3 }
	]

	it('should return all boards', async () => {
		const mockBoards = [
			{ id: 'uuid-1', name: 'Test Board', createdAt: new Date() }
		]

		vi.mocked(prisma.board.findMany).mockResolvedValue(mockBoards)

		const result = await boardService.getAllBoards()

		expect(result).toEqual(mockBoards)
		expect(prisma.board.findMany).toHaveBeenCalledTimes(1)
	})

	it('should create a new board with 3 default columns', async () => {
		const boardName = 'Engineering Board'
		const mockBoardId = 'uuid-123'

		const mockCreatedBoard = {
			id: mockBoardId,
			name: boardName,
			createdAt: new Date(),
			columns: DEFAULT_COLUMNS.map((col, index) => ({
				id: index + 1,
				...col,
				boardId: mockBoardId
			}))
		}

		vi.mocked(prisma.board.create).mockResolvedValue(mockCreatedBoard)

		const result = await boardService.createBoard(boardName)

		expect(result.name).toBe(boardName)
		expect(result.columns).toBeDefined()
		const columns = result.columns!
		expect(columns).toHaveLength(3)
		expect(columns[0]!.title).toBe('To Do')
		expect(columns[1]!.title).toBe('In Progress')
		expect(columns[2]!.title).toBe('Done')

		expect(prisma.board.create).toHaveBeenCalledWith({
			data: {
				name: boardName,
				columns: {
					create: DEFAULT_COLUMNS
				}
			},
			include: {
				columns: true
			}
		})
	})
})

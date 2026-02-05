// import { beforeEach, describe, expect, it, vi } from 'vitest'

// import { prisma } from '@/lib/prisma'

// import * as columnService from './column.service'

// vi.mock('@/lib/prisma', () => ({
// 	prisma: {
// 		column: {
// 			create: vi.fn(),
// 			update: vi.fn(),
// 			delete: vi.fn()
// 		}
// 	}
// }))

// describe('Column Service', () => {
// 	beforeEach(() => {
// 		vi.clearAllMocks()
// 	})

// 	it('should create a column for a specific board', async () => {
// 		const mockColumn = { id: 1, title: 'To Do', boardId: 'uuid-board-123' }

// 		// eslint-disable-next-line
// 		// @ts-ignore
// 		prisma.column.create.mockResolvedValue(mockColumn)

// 		const result = await columnService.createColumn('To Do', 'uuid-board-123')

// 		expect(result).toEqual(mockColumn)
// 		expect(prisma.column.create).toHaveBeenCalledWith({
// 			data: {
// 				title: 'To Do',
// 				boardId: 'uuid-board-123'
// 			}
// 		})
// 	})

// 	it('should update column title by numeric ID', async () => {
// 		const updatedColumn = { id: 1, title: 'In Progress', boardId: 'uuid-123' }

// 		// eslint-disable-next-line
// 		// @ts-ignore
// 		prisma.column.update.mockResolvedValue(updatedColumn)

// 		const result = await columnService.updateColumn(1, 'In Progress')

// 		expect(result.title).toBe('In Progress')
// 		expect(prisma.column.update).toHaveBeenCalledWith({
// 			where: { id: 1 },
// 			data: { title: 'In Progress' }
// 		})
// 	})

// 	it('should delete column by numeric ID', async () => {
// 		// eslint-disable-next-line
// 		// @ts-ignore
// 		prisma.column.delete.mockResolvedValue({ id: 1 })

// 		await columnService.deleteColumn(1)

// 		expect(prisma.column.delete).toHaveBeenCalledWith({
// 			where: { id: 1 }
// 		})
// 	})
// })

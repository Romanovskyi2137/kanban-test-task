/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
	RECENT_BOARDS_KEY,
	getRecentBoards,
	removeBoardFromStorage,
	saveBoardToStorage
} from './storage'

describe('storage utils', () => {
	beforeEach(() => {
		localStorage.clear()
		vi.clearAllMocks()
	})

	it('should return an empty array if no boards are saved', () => {
		const boards = getRecentBoards()
		expect(boards).toEqual([])
	})

	it('should save a new board to storage', () => {
		const newBoard = { id: '1', name: 'Test Board' }
		const updated = saveBoardToStorage(newBoard)

		expect(updated).toHaveLength(1)
		expect(updated[0]).toEqual(newBoard)
		expect(JSON.parse(localStorage.getItem(RECENT_BOARDS_KEY) || '[]')).toEqual(
			updated
		)
	})

	it('should move existing board to the top if saved again', () => {
		saveBoardToStorage({ id: '1', name: 'Old Name' })
		saveBoardToStorage({ id: '2', name: 'Board 2' })

		const updated = saveBoardToStorage({ id: '1', name: 'Updated Name' })

		expect(updated).toHaveLength(2)
		expect(updated[0].id).toBe('1')
		expect(updated[0].name).toBe('Updated Name')
	})

	it('should limit the number of boards to 5', () => {
		for (let i = 1; i <= 6; i++) {
			saveBoardToStorage({ id: `${i}`, name: `Board ${i}` })
		}

		const boards = getRecentBoards()
		expect(boards).toHaveLength(5)
		expect(boards[0].id).toBe('6')
		expect(boards.find(board => board.id === '1')).toBeUndefined()
	})

	it('should remove a board by id', () => {
		saveBoardToStorage({ id: '1', name: 'Board 1' })
		saveBoardToStorage({ id: '2', name: 'Board 2' })

		const updated = removeBoardFromStorage('1')

		expect(updated).toHaveLength(1)
		expect(updated[0].id).toBe('2')
		expect(getRecentBoards()).toHaveLength(1)
	})
})

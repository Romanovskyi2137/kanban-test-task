export const RECENT_BOARDS_KEY = 'kanban_recent_boards'
const MAX_RECENT_BOARDS = 5

export interface RecentBoard {
	id: string
	name: string
}

export const getRecentBoards = (): RecentBoard[] => {
	try {
		const existing = localStorage.getItem(RECENT_BOARDS_KEY)
		if (!existing) {
			return []
		}
		const parsed = JSON.parse(existing)
		return Array.isArray(parsed) ? parsed : []
	} catch (error) {
		console.error('Failed to parse recent boards from storage:', error)
		return []
	}
}

export const saveBoardToStorage = (board: RecentBoard) => {
	try {
		const boards = getRecentBoards()

		const filtered = boards.filter(brd => brd.id !== board.id)
		const updated = [board, ...filtered].slice(0, MAX_RECENT_BOARDS)

		localStorage.setItem(RECENT_BOARDS_KEY, JSON.stringify(updated))
	} catch (error) {
		console.error('Failed to save board to storage:', error)
	}
}

export const removeBoardFromStorage = (id: string) => {
	const boards = getRecentBoards()
	const updated = boards.filter(brd => brd.id !== id)
	localStorage.setItem(RECENT_BOARDS_KEY, JSON.stringify(updated))
}

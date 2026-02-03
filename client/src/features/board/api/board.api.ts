import type { Board } from '@app-types/kanban'

import apiClient from '@api/client'

/**
 * Fetch a single board with all its columns and cards
 */
export const getBoard = async (id: string): Promise<Board> => {
	const { data } = await apiClient.get<Board>(`/boards/${id}`)
	return data
}

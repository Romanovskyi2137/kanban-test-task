import type { Board } from '@app-types/kanban'

import apiClient from '@api/client'

export const createBoard = async (name: string): Promise<Board> => {
	const { data } = await apiClient.post<Board>('/boards', { name })
	return data
}

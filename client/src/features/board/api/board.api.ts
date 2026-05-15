import type { Board } from '@app-types/kanban'

import apiClient from '@api/client'

export const getBoard = async (id: string): Promise<Board> => {
	const { data } = await apiClient.get<Board>(
		`boards/${encodeURIComponent(id)}`
	)
	return data
}
export const updateBoard = async (id: string, name: string): Promise<Board> => {
	const response = await apiClient.patch<Board>(
		`boards/${encodeURIComponent(id)}`,
		{ name }
	)
	return response.data
}
export const deleteBoard = async (id: string) => {
	await apiClient.delete(`boards/${encodeURIComponent(id)}`)
}

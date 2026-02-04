import type { Card } from '@app-types/kanban'

import apiClient from '@api/client'

export const cardApi = {
	create: async (data: { title: string; columnId: number }): Promise<Card> => {
		const response = await apiClient.post<Card>('/cards', data)
		return response.data
	},
	update: async (
		id: number,
		data: { title?: string; description?: string }
	) => {
		const response = await apiClient.patch(`/cards/${id}`, data)
		return response.data
	},
	delete: async (id: number) => {
		await apiClient.delete(`/cards/${id}`)
	}
}

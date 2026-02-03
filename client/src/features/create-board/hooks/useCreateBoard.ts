import { useMutation } from '@tanstack/react-query'

import { saveBoardToStorage } from '@utils/storage'

import { createBoard } from '../api/create-board.api'

export const useCreateBoard = () => {
	return useMutation({
		mutationFn: createBoard,
		onSuccess: data => {
			saveBoardToStorage({ id: data.id, name: data.name })

			window.location.href = `/board/?id=${data.id}`
		}
	})
}

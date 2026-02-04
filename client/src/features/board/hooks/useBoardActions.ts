import { useMutation, useQueryClient } from '@tanstack/react-query'

import { useAppStore } from '@store/useAppStore'
import { removeBoardFromStorage, saveBoardToStorage } from '@utils/storage'

import * as boardApi from '../api/board.api'

export const useBoardActions = () => {
	const queryClient = useQueryClient()
	const setRecentBoards = useAppStore(state => {
		return state.setRecentBoards
	})

	const updateMutation = useMutation({
		mutationFn: ({ id, name }: { id: string; name: string }) => {
			return boardApi.updateBoard(id, name)
		},
		onSuccess: (updatedBoard, variables) => {
			queryClient.invalidateQueries({ queryKey: ['board', variables.id] })

			const updated = saveBoardToStorage({
				id: variables.id,
				name: variables.name
			})
			setRecentBoards(updated)
		}
	})

	const deleteMutation = useMutation({
		mutationFn: (id: string) => {
			return boardApi.deleteBoard(id)
		},
		onSuccess: (data, id) => {
			const updated = removeBoardFromStorage(id)
			setRecentBoards(updated)

			window.location.replace('/')
		}
	})

	return { updateBoard: updateMutation, deleteBoard: deleteMutation }
}

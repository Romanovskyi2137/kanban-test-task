import { useNavigate } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'

import { saveBoardToStorage } from '@utils/storage'

import { createBoard } from '../api/create-board.api'

export const useCreateBoard = () => {
	const navigate = useNavigate()

	return useMutation({
		mutationFn: createBoard,
		onSuccess: data => {
			saveBoardToStorage({ id: data.id, name: data.name })
			navigate(`/board/${data.id}`)
		}
	})
}

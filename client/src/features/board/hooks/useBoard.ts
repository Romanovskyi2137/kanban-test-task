import { useQuery } from '@tanstack/react-query'

import { getBoard } from '../api/board.api'

export const useBoard = (boardId: string) => {
	return useQuery({
		queryKey: ['board', boardId],
		queryFn: () => getBoard(boardId),
		enabled: Boolean(boardId),
		staleTime: 1000 * 60 * 5
	})
}

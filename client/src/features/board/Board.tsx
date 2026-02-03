import { useEffect } from 'react'

import { useBoard } from '@features/board/hooks/useBoard'

import { saveBoardToStorage } from '@utils/storage'

import styles from './Board.module.scss'
import Column from './components/Column/Column'

interface BoardProps {
	boardId: string
}

const Board = ({ boardId }: BoardProps) => {
	const { data: board, isLoading, isError, isSuccess } = useBoard(boardId)
	useEffect(() => {
		if (isSuccess && board) {
			saveBoardToStorage({ id: board.id, name: board.name })
		}
	}, [board])

	if (isLoading) {
		return <div className={styles.loading}>Loading board...</div>
	}

	if (isError || !board) {
		return <div className={styles.error}>Error: Board not found</div>
	}

	return (
		<div className={styles.boardWrapper}>
			<h1>{board.name}</h1>
			<div className={styles.columnsContainer}>
				{board.columns.map(column => (
					<Column
						key={column.id}
						column={column}
						boardId={board.id}
					/>
				))}
			</div>
		</div>
	)
}

export default Board

import { useBoard } from '@features/board/hooks/useBoard'

import styles from './Board.module.scss'
import Column from './components/Column/Column'

interface BoardProps {
	boardId: string
}

const Board = ({ boardId }: BoardProps) => {
	const { data: board, isLoading, isError } = useBoard(boardId)

	if (isLoading) {
		return <div className={styles.loading}>Loading board...</div>
	}

	if (isError || !board) {
		return <div className={styles.error}>Error: Board not found</div>
	}

	return (
		<div className={styles.boardWrapper}>
			<div className={styles.columnsContainer}>
				{board.columns.map(column => (
					<Column
						key={column.id}
						column={column}
					/>
				))}
			</div>
		</div>
	)
}

export default Board

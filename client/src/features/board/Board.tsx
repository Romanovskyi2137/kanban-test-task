import { useEffect } from 'react'

import { useBoard } from '@features/board/hooks/useBoard'
import { useMoveCard } from '@features/board/hooks/useMoveCard'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'

import { saveBoardToStorage } from '@utils/storage'

import styles from './Board.module.scss'
import Column from './components/Column/Column'

interface BoardProps {
	boardId: string
}

const Board = ({ boardId }: BoardProps) => {
	const { data: board, isLoading, isError, isSuccess } = useBoard(boardId)
	const { mutate: moveCard } = useMoveCard(boardId)

	useEffect(() => {
		if (isSuccess && board) {
			saveBoardToStorage({ id: board.id, name: board.name })
		}
	}, [board, isSuccess])

	const onDragEnd = (result: DropResult) => {
		const { destination, source, draggableId } = result

		if (!destination) {
			return
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		moveCard({
			cardId: Number(draggableId),
			targetColumnId: Number(destination.droppableId),
			newOrder: destination.index + 1
		})
	}

	if (isLoading) {
		return <div className={styles.loading}>Loading board...</div>
	}

	if (isError || !board) {
		return <div className={styles.error}>Error: Board not found</div>
	}

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.boardWrapper}>
				<h1 className={styles.boardTitle}>{board.name}</h1>
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
		</DragDropContext>
	)
}

export default Board

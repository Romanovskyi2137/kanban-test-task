import { useEffect, useState } from 'react'

import { useBoard } from '@features/board/hooks/useBoard'
import { useBoardActions } from '@features/board/hooks/useBoardActions'
import { useMoveCard } from '@features/board/hooks/useMoveCard'
import { DragDropContext, type DropResult } from '@hello-pangea/dnd'

import { useAppStore } from '@store/useAppStore'
import { saveBoardToStorage } from '@utils/storage'

import styles from './Board.module.scss'
import Column from './components/Column/Column'

interface BoardProps {
	boardId: string
}

const Board = ({ boardId }: BoardProps) => {
	const { data: board, isLoading, isError, isSuccess } = useBoard(boardId)
	const { mutate: moveCard } = useMoveCard(boardId)
	const { updateBoard, deleteBoard } = useBoardActions()
	const setRecentBoards = useAppStore(state => state.setRecentBoards)

	const [isEditing, setIsEditing] = useState(false)
	const [title, setTitle] = useState('')

	useEffect(() => {
		if (isSuccess && board) {
			const updated = saveBoardToStorage({ id: board.id, name: board.name })
			setRecentBoards(updated)
			setTitle(board.name)
		}
	}, [board, isSuccess, setRecentBoards])

	const handleUpdate = () => {
		if (title.trim() && title !== board?.name) {
			updateBoard.mutate({ id: boardId, name: title })
		}
		setIsEditing(false)
	}

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this board?')) {
			deleteBoard.mutate(boardId)
		}
	}

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
				<header className={styles.boardHeader}>
					<div className={styles.titleContainer}>
						{isEditing ? (
							<input
								className={styles.titleInput}
								value={title}
								onChange={e => setTitle(e.target.value)}
								onBlur={handleUpdate}
								onKeyDown={e => e.key === 'Enter' && handleUpdate()}
								autoFocus
							/>
						) : (
							<div className={styles.titleWrapper}>
								<h1
									onClick={() => setIsEditing(true)}
									className={styles.boardTitle}
								>
									{board.name}
								</h1>
								<button
									className={styles.iconDeleteBtn}
									onClick={handleDelete}
									aria-label="Delete board"
								>
									<svg
										width="18"
										height="18"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2m-6 9l4-4m-4 0l4 4" />
									</svg>
								</button>
							</div>
						)}
					</div>
				</header>

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

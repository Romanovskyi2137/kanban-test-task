import { useState } from 'react'

import { type Card as CardType } from '@app-types/kanban'
import { Draggable } from '@hello-pangea/dnd'

import { useCardActions } from '../../hooks/useCardActions'
import styles from './Card.module.scss'

interface CardProps {
	card: CardType
	index: number
	boardId: string
}

export const Card = ({ card, index, boardId }: CardProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const [title, setTitle] = useState(card.title)
	const [description, setDescription] = useState(card.description || '')

	const { updateCard, deleteCard } = useCardActions(boardId)

	const handleSave = () => {
		updateCard.mutate(
			{
				id: card.id,
				data: { title, description }
			},
			{
				onSuccess: () => {
					setIsEditing(false)
				}
			}
		)
	}

	return (
		<Draggable
			draggableId={card.id.toString()}
			index={index}
		>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					className={`${styles.card} ${snapshot.isDragging ? styles.dragging : ''}`}
				>
					{isEditing ? (
						<div className={styles.editMode}>
							<input
								className={styles.titleInput}
								value={title}
								onChange={event => {
									setTitle(event.target.value)
								}}
								placeholder="Card title..."
								autoFocus
							/>
							<textarea
								className={styles.descInput}
								value={description}
								onChange={event => {
									setDescription(event.target.value)
								}}
								placeholder="Add a more detailed description..."
							/>
							<div className={styles.editActions}>
								<button
									onClick={handleSave}
									className={styles.saveBtn}
								>
									Save
								</button>
								<button
									onClick={() => {
										setIsEditing(false)
									}}
									className={styles.cancelBtn}
								>
									Cancel
								</button>
							</div>
						</div>
					) : (
						<div className={styles.viewMode}>
							<div className={styles.header}>
								<span className={styles.cardTitle}>{card.title}</span>
								<div className={styles.controls}>
									<button
										onClick={() => {
											setIsEditing(true)
										}}
										className={styles.iconBtn}
										title="Edit"
									>
										✏️
									</button>
									<button
										onClick={() => {
											deleteCard.mutate(card.id)
										}}
										className={styles.iconBtn}
										title="Delete"
									>
										🗑️
									</button>
								</div>
							</div>
							{card.description && (
								<p className={styles.cardDesc}>{card.description}</p>
							)}
						</div>
					)}
				</div>
			)}
		</Draggable>
	)
}

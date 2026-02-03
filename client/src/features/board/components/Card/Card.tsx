import type { Card as CardType } from '@app-types/kanban'
import { Draggable } from '@hello-pangea/dnd'

import styles from './Card.module.scss'

interface CardProps {
	card: CardType
	index: number
}

export const Card = ({ card, index }: CardProps) => {
	return (
		<Draggable
			draggableId={card.id.toString()}
			index={index}
		>
			{(provided, snapshot) => (
				<div
					className={`${styles.card} ${snapshot.isDragging ? styles.dragging : ''}`}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					{card.title}
				</div>
			)}
		</Draggable>
	)
}

import type { Column as ColumnType } from '@app-types/kanban'
import { Droppable } from '@hello-pangea/dnd'

import { AddCardForm } from '../AddCardForm/AddCardForm'
import { Card } from '../Card/Card'
import styles from './Column.module.scss'

interface ColumnProps {
	column: ColumnType
	boardId: string
}

const Column = ({ column, boardId }: ColumnProps) => {
	const sortedCards = [...column.cards].sort(
		(cardA, cardB) => cardA.order - cardB.order
	)

	return (
		<div className={styles.column}>
			<div className={styles.header}>
				<h3 className={styles.title}>{column.title}</h3>
				<span className={styles.count}>{column.cards.length}</span>
			</div>

			<Droppable droppableId={column.id.toString()}>
				{(provided, snapshot) => (
					<div
						className={`${styles.cardsList} ${
							snapshot.isDraggingOver ? styles.draggingOver : ''
						}`}
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{sortedCards.map((card, index) => (
							<Card
								key={card.id}
								card={card}
								index={index}
							/>
						))}

						{provided.placeholder}
					</div>
				)}
			</Droppable>

			<div className={styles.footer}>
				<AddCardForm
					columnId={column.id}
					boardId={boardId}
				/>
			</div>
		</div>
	)
}

export default Column

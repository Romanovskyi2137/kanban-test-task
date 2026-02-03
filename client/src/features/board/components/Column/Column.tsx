import type { Column as ColumnType } from '@app-types/kanban'

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

			<div className={styles.cardsList}>
				{sortedCards.map(card => (
					<Card
						key={card.id}
						card={card}
					/>
				))}
			</div>

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

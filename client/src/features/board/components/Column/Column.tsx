import type { Column as ColumnType } from '@app-types/kanban'

import Card from '../Card/Card'
import styles from './Column.module.scss'

interface ColumnProps {
	column: ColumnType
}

const Column = ({ column }: ColumnProps) => {
	const sortedCards = [...column.cards].sort(
		(cardA, cardB) => cardA.order - cardB.order
	)

	return (
		<div className={styles.column}>
			<div className={styles.header}>
				<h3 className={styles.title}>{column.title}</h3>
				<span className={styles.count}>{column.cards.length}</span>
			</div>
			<div className={styles.cardList}>
				{sortedCards.map(card => (
					<Card
						key={card.id}
						card={card}
					/>
				))}
			</div>
			<button className={styles.addCard}>+ Add a card</button>
		</div>
	)
}

export default Column

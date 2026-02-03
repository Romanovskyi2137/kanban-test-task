import type { Card as CardType } from '@app-types/kanban'

import styles from './Card.module.scss'

interface CardProps {
	card: CardType
}

const Card = ({ card }: CardProps) => {
	return (
		<div className={styles.card}>
			<h4 className={styles.title}>{card.title}</h4>
			{Boolean(card.description) && (
				<p className={styles.description}>{card.description}</p>
			)}
		</div>
	)
}

export default Card

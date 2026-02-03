import type { Card as CardType } from '@app-types/kanban'

import styles from './Card.module.scss'

export const Card = ({ card }: { card: CardType }) => {
	return <div className={styles.card}>{card.title}</div>
}

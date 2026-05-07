import { Link } from 'react-router-dom'

import { useAppStore } from '@store/useAppStore'

import styles from './RecentBoardsWidget.module.scss'

export const RecentBoardsWidget = () => {
	const boards = useAppStore(state => state.recentBoards)

	if (boards.length === 0) {
		return null
	}

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Your Recent Boards</h3>
			<div className={styles.list}>
				{boards.map(board => (
					<Link
						key={board.id}
						to={`/board/${board.id}`}
						className={styles.item}
					>
						<span className={styles.name}>{board.name}</span>
					</Link>
				))}
			</div>
		</div>
	)
}

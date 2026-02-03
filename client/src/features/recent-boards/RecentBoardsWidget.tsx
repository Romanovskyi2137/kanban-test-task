import { getRecentBoards } from '@utils/storage'

import styles from './RecentBoardsWidget.module.scss'

export const RecentBoardsWidget = () => {
	const boards = getRecentBoards()

	if (boards.length === 0) {
		return null
	}
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Your Recent Boards</h3>
			<div className={styles.list}>
				{boards.map(board => (
					<a
						key={board.id}
						href={`/board/?id=${board.id}`}
						className={styles.item}
					>
						<span className={styles.name}>{board.name}</span>
						<span className={styles.id}>#{board.id.slice(0, 4)}</span>
					</a>
				))}
			</div>
		</div>
	)
}

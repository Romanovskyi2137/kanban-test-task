import Board from '@features/board/Board'
import { CreateBoardWidget } from '@features/create-board/CreateBoardWidget'
import { RecentBoardsWidget } from '@features/recent-boards/RecentBoardsWidget'
import { SearchBoardWidget } from '@features/search-board/SearchBoardWidget'

import styles from './App.module.scss'

const App = () => {
	const params = new URLSearchParams(window.location.search)
	const boardId = params.get('id') || ''

	return (
		<div className={styles.appLayout}>
			<aside className={styles.sidebar}>
				<div className={styles.logo}>⚡️ Kanban Engine</div>
				<RecentBoardsWidget />
			</aside>

			<main className={styles.mainContent}>
				<header className={styles.topBar}>
					<div className={styles.actions}>
						<SearchBoardWidget />
						<CreateBoardWidget />
					</div>
					{boardId && (
						<button
							className={styles.homeBtn}
							onClick={() => (window.location.href = window.location.pathname)}
						>
							Home
						</button>
					)}
				</header>

				<section className={styles.stage}>
					{boardId ? (
						<Board boardId={boardId} />
					) : (
						<div className={styles.emptyState}>
							<h2>Select a board from the sidebar or search by ID to start</h2>
						</div>
					)}
				</section>
			</main>
		</div>
	)
}

export default App

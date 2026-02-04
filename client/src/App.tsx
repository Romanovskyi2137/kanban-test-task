import Board from '@features/board/Board'
import { CreateBoardWidget } from '@features/create-board/CreateBoardWidget'
import { RecentBoardsWidget } from '@features/recent-boards/RecentBoardsWidget'
import { SearchBoardWidget } from '@features/search-board/SearchBoardWidget'

import { Sidebar } from '@components/Sidebar/Sidebar'

import styles from './App.module.scss'

const App = () => {
	const params = new URLSearchParams(window.location.search)
	const boardId = params.get('id') || ''

	return (
		<div className={styles.appLayout}>
			<Sidebar>
				<div className={styles.logo}>⚡️ kinda Kanban</div>
				<CreateBoardWidget />
				<div className={styles.divider} />
				<SearchBoardWidget />
				<RecentBoardsWidget />
			</Sidebar>

			<main className={styles.mainContent}>
				<header className={styles.topBar}>
					<div className={styles.boardInfo}>
						{boardId && (
							<h2 className={styles.currentBoardTitle}>⚡️ kinda Kanban</h2>
						)}
					</div>

					<div className={styles.topActions}></div>
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

import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Board from '@features/board/Board'
import { CreateBoardWidget } from '@features/create-board/CreateBoardWidget'
import { RecentBoardsWidget } from '@features/recent-boards/RecentBoardsWidget'
import { SearchBoardWidget } from '@features/search-board/SearchBoardWidget'

import { Sidebar } from '@components/Sidebar/Sidebar'
import { useAppStore } from '@store/useAppStore'

import styles from './App.module.scss'

const App = () => {
	const { boardId } = useParams<{ boardId: string }>()
	const errorToast = useAppStore(state => state.errorToast)
	const setErrorToast = useAppStore(state => state.setErrorToast)

	useEffect(() => {
		if (!errorToast) {
			return
		}
		const timer = setTimeout(() => setErrorToast(null), 4000)
		return () => clearTimeout(timer)
	}, [errorToast, setErrorToast])

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

			{errorToast && (
				<div
					className={styles.errorToast}
					onClick={() => setErrorToast(null)}
				>
					{errorToast}
				</div>
			)}
		</div>
	)
}

export default App

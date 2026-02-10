import { useState } from 'react'

import styles from './SearchBoardWidget.module.scss'

export const SearchBoardWidget = () => {
	const [boardId, setBoardId] = useState('')

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		const id = boardId.trim()

		if (id) {
			const url = new URL(window.location.href)
			console.log(window.location.href)

			url.searchParams.set('id', id)
			window.location.href = url.toString()
		}
	}

	return (
		<div className={styles.widget}>
			<h3 className={styles.title}>Open Existing Board</h3>
			<form
				onSubmit={handleSearch}
				className={styles.form}
			>
				<input
					type="text"
					placeholder="Paste Board ID here..."
					value={boardId}
					onChange={e => setBoardId(e.target.value)}
					className={styles.input}
				/>
				<button
					type="submit"
					className={styles.button}
				>
					Go
				</button>
			</form>
		</div>
	)
}

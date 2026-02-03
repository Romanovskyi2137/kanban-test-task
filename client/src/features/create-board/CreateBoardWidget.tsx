import { useState } from 'react'

import styles from './CreateBoardWidget.module.scss'
import { useCreateBoard } from './hooks/useCreateBoard'

export const CreateBoardWidget = () => {
	const [name, setName] = useState('')
	const { mutate, isPending } = useCreateBoard()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		if (name.trim()) {
			mutate(name)
		}
	}

	return (
		<div className={styles.widget}>
			<h3 className={styles.title}>Create New Board</h3>
			<form
				onSubmit={handleSubmit}
				className={styles.form}
			>
				<input
					type="text"
					placeholder="Board name..."
					value={name}
					onChange={e => setName(e.target.value)}
					className={styles.input}
					disabled={isPending}
				/>
				<button
					type="submit"
					className={styles.button}
					disabled={isPending}
				>
					{isPending ? 'Creating...' : 'Create'}
				</button>
			</form>
		</div>
	)
}

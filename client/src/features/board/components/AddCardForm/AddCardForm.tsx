import { useEffect, useRef, useState } from 'react'

import { useCreateCard } from '../../hooks/useCreateCard'
import styles from './AddCardForm.module.scss'

interface Props {
	columnId: number
	boardId: string
}

export const AddCardForm = ({ columnId, boardId }: Props) => {
	const [isEditing, setIsEditing] = useState(false)
	const [title, setTitle] = useState('')
	const { mutate, isPending } = useCreateCard(boardId)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		if (isEditing) {
			textareaRef.current?.focus()
		}
	}, [isEditing])

	const handleSubmit = () => {
		if (title.trim()) {
			mutate(
				{ title, columnId },
				{
					onSuccess: () => {
						setTitle('')
						setIsEditing(false)
					}
				}
			)
		}
	}

	if (!isEditing) {
		return (
			<button
				className={styles.addBtn}
				onClick={() => setIsEditing(true)}
			>
				+ Add a card
			</button>
		)
	}

	return (
		<div className={styles.container}>
			<textarea
				ref={textareaRef}
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder="Enter a title for this card..."
				onKeyDown={e =>
					e.key === 'Enter' &&
					!e.shiftKey &&
					(e.preventDefault(), handleSubmit())
				}
			/>
			<div className={styles.controls}>
				<button
					onClick={handleSubmit}
					disabled={isPending}
				>
					Add card
				</button>
				<button onClick={() => setIsEditing(false)}>✕</button>
			</div>
		</div>
	)
}

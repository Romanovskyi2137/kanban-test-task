import { useBoard } from '@features/board/hooks/useBoard'

const App = () => {
	const boardId = '1'
	const { data, isLoading, error } = useBoard(boardId)

	if (isLoading) {
		return <div>Loading...</div>
	}
	if (error) {
		return <div>Error loading board</div>
	}

	console.log('Board data:', data)

	return (
		<div className="app">
			<h1>Kanban: {data?.name}</h1>
		</div>
	)
}

export default App

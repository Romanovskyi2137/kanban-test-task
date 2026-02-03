import Board from '@features/board/Board'

const App = () => {
	const boardId = '1'

	return (
		<div className="app">
			<Board boardId={boardId} />
		</div>
	)
}

export default App

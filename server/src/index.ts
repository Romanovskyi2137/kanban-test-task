import cors from 'cors'
import express from 'express'

import boardRouter from '@/src/api/routers/board.routes'
import cardRouter from '@/src/api/routers/card.routes'

// import columnRouter from '@/src/api/routers/column.routes'

const app = express()

app.use(
	cors({
		origin:
			process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
		credentials: true
	})
)

app.use(express.json())

app.use('/api/boards', boardRouter)
// app.use('/api/columns', columnRouter)
app.use('/api/cards', cardRouter)

export default app

if (process.env.NODE_ENV !== 'production') {
	const PORT = process.env.PORT || 3000
	app.listen(PORT, () => {
		console.log(`🚀 Server is running on http://localhost:${PORT}`)
	})
}

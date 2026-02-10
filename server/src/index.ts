import cors from 'cors'
import express from 'express'

import boardRouter from './api/routers/boardRouter'
import cardRouter from './api/routers/cardRouter'

const app = express()

app.use(
	cors({
		origin:
			process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
		credentials: false
	})
)

app.use(express.json())

app.use('/api/boards', boardRouter)
app.use('/api/cards', cardRouter)

export default app

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
	const port = process.env.PORT || 3000
	app.listen(port, () => console.log(`Server running on port ${port}`))
}

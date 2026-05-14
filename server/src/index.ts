import cors from 'cors'
import express from 'express'

import { errorHandler } from './api/middleware/errorHandler.js'
import boardRouter from './api/routers/boardRouter'
import cardRouter from './api/routers/cardRouter'
import healthRouter from './api/routers/healthRouter'

const app = express()

app.use(
	cors({
		origin:
			process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
		credentials: false
	})
)

app.use(express.json())

// put other non-error related middlewares here

app.use('/api/health', healthRouter)
app.use('/api/boards', boardRouter)
app.use('/api/cards', cardRouter)

app.use(errorHandler)

export default app

if (!process.env.VERCEL) {
	const port = process.env.PORT || 3000
	app.listen(port, () => console.log(`Server running on port ${port}`))
}

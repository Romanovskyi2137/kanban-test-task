import cors from 'cors'
import express from 'express'

import { errorHandler } from './api/middleware/errorHandler.js'
import boardRouter from './api/routers/boardRouter.js'
import cardRouter from './api/routers/cardRouter.js'
import healthRouter from './api/routers/healthRouter.js'

const app = express()

const corsOptions: cors.CorsOptions = {
	origin: process.env.NODE_ENV === 'production' ? process.env.CLIENT_URL : '*',
	credentials: false
}

app.options('*', cors(corsOptions))
app.use(cors(corsOptions))

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

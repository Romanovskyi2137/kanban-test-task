import cors from 'cors'
import express from 'express'

import boardRouter from '@/src/api/routers/board.routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/boards', boardRouter)

app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`)
})

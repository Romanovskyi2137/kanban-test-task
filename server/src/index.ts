import cors from 'cors'
import express from 'express'

import boardRouter from '@/src/api/routers/board.routes'
import columnRouter from '@/src/api/routers/column.routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/api/boards', boardRouter)
app.use('/api/columns', columnRouter)

app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`)
})

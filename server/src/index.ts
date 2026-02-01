import cors from 'cors'
import express from 'express'

import { prisma } from '../lib/prisma'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/boards', async (req, res) => {
	try {
		const boards = await prisma.board.findMany()
		res.json(boards)
	} catch (error) {
		res.status(500).json({ error: 'Failed to fetch boards', e: error })
	}
})

app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`)
})

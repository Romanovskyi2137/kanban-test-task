import { Router } from 'express'

import { prisma } from '../../lib/prisma.js'

const healthRouter = Router()

healthRouter.get('/', async (_req, res) => {
	try {
		await prisma.$queryRaw`SELECT 1`
		res.json({ status: 'ok', db: 'ok' })
	} catch {
		res.status(503).json({ status: 'error', db: 'unreachable' })
	}
})

export default healthRouter

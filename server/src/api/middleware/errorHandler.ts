import type { ErrorRequestHandler } from 'express'

import { HttpError } from '../../errors.js'

const PRISMA_ERROR_MAP: Record<string, [number, string]> = {
	P2025: [404, 'Not found'],
	P2002: [409, 'Resource already exists'],
	P2003: [400, 'Invalid reference']
}

const getPrismaStatus = (error: unknown): [number, string] | null => {
	if (typeof error !== 'object' || error === null || !('code' in error)) {
		return null
	}
	return PRISMA_ERROR_MAP[(error as { code: string }).code] ?? null
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	if (err instanceof HttpError) {
		res.status(err.status).json({ message: err.message })
		return
	}
	const prismaStatus = getPrismaStatus(err)
	if (prismaStatus) {
		res.status(prismaStatus[0]).json({ message: prismaStatus[1] })
		return
	}
	console.error(err)
	res.status(500).json({ message: 'Internal server error' })
}

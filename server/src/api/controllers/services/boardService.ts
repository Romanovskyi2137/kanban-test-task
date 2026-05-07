import { DEFAULT_COLUMNS } from '../../../constants.js'
import { HttpError } from '../../../errors.js'
import { prisma } from '../../../lib/prisma.js'

export const getAllBoards = async () => {
	return await prisma.board.findMany()
}

export const getBoardById = async (id: string) => {
	const board = await prisma.board.findUnique({
		where: { id },
		include: {
			columns: {
				orderBy: { order: 'asc' },
				include: {
					cards: {
						orderBy: { order: 'asc' }
					}
				}
			}
		}
	})
	if (!board) {
		throw new HttpError(404, 'Board not found')
	}
	return board
}

export const createBoard = async (name: unknown) => {
	if (!name || typeof name !== 'string') {
		throw new HttpError(400, 'Name is required')
	}
	return await prisma.board.create({
		data: {
			name,
			columns: { create: DEFAULT_COLUMNS }
		},
		include: { columns: true }
	})
}

export const updateBoard = async (id: string, name: unknown) => {
	if (!name || typeof name !== 'string') {
		throw new HttpError(400, 'Name is required')
	}
	return await prisma.board.update({ where: { id }, data: { name } })
}

export const deleteBoard = async (id: string) => {
	return await prisma.board.delete({ where: { id } })
}

import { prisma } from '@/lib/prisma'

const DEFAULT_COLUMNS = [
	{ title: 'To Do', order: 1 },
	{ title: 'In Progress', order: 2 },
	{ title: 'Done', order: 3 }
]

export const getAllBoards = async () => {
	return await prisma.board.findMany()
}

export const getBoardById = async (id: string) => {
	return await prisma.board.findUnique({
		where: { id },
		include: {
			columns: {
				include: {
					cards: {
						orderBy: { order: 'asc' }
					}
				}
			}
		}
	})
}

export const createBoard = async (name: string) => {
	return await prisma.board.create({
		data: {
			name,
			columns: {
				create: DEFAULT_COLUMNS
			}
		},
		include: {
			columns: true
		}
	})
}

export const updateBoard = async (id: string, name: string) => {
	return await prisma.board.update({
		where: { id },
		data: { name }
	})
}

export const deleteBoard = async (id: string) => {
	return await prisma.board.delete({
		where: { id }
	})
}

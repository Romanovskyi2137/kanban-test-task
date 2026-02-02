import { prisma } from '@/lib/prisma'

export const getAllBoards = async () => {
	return await prisma.board.findMany({
		orderBy: { createdAt: 'desc' }
	})
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
		data: { name }
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

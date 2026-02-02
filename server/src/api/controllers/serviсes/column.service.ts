import { prisma } from '@/lib/prisma'

export const createColumn = async (title: string, boardId: string) => {
	return await prisma.column.create({
		data: {
			title,
			boardId
		}
	})
}

export const updateColumn = async (id: number, title: string) => {
	return await prisma.column.update({
		where: { id },
		data: { title }
	})
}

export const deleteColumn = async (id: number) => {
	return await prisma.column.delete({
		where: { id }
	})
}

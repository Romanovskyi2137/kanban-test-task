// import type { Request, Response } from 'express'

// import * as columnService from '@/src/api/controllers/serviсes/column.service'

// export const createColumn = async (req: Request, res: Response) => {
// 	try {
// 		const { title, boardId } = req.body
// 		if (!title || !boardId) {
// 			return res.status(400).json({ message: 'Title and boardId are required' })
// 		}
// 		const column = await columnService.createColumn(title, boardId)
// 		res.status(201).json(column)
// 	} catch (error) {
// 		res.status(500).json({ message: 'Error creating column', error })
// 	}
// }

// export const updateColumn = async (
// 	req: Request<{ id: string }>,
// 	res: Response
// ) => {
// 	try {
// 		const id = parseInt(req.params.id)
// 		const { title } = req.body

// 		if (isNaN(id)) {
// 			return res.status(400).json({ message: 'Invalid column ID' })
// 		}

// 		const updated = await columnService.updateColumn(id, title)
// 		res.json(updated)
// 	} catch (error) {
// 		res.status(500).json({ message: 'Error updating column', error })
// 	}
// }

// export const deleteColumn = async (
// 	req: Request<{ id: string }>,
// 	res: Response
// ) => {
// 	try {
// 		const id = parseInt(req.params.id)
// 		if (isNaN(id)) {
// 			return res.status(400).json({ message: 'Invalid column ID' })
// 		}

// 		await columnService.deleteColumn(id)
// 		res.status(204).send()
// 	} catch (error) {
// 		res.status(500).json({ message: 'Error deleting column', error })
// 	}
// }

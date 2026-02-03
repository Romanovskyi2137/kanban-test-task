import type { Request, Response } from 'express'

import * as cardService from '@/src/api/controllers/serviсes/card.service'

export const createCard = async (req: Request, res: Response) => {
	try {
		const { title, description, columnId } = req.body

		if (!title || !columnId) {
			return res
				.status(400)
				.json({ message: 'Title and columnId are required' })
		}

		const card = await cardService.createCard(
			title,
			description,
			parseInt(columnId)
		)
		res.status(201).json(card)
	} catch (error) {
		res.status(500).json({ message: 'Error creating card', error })
	}
}

export const updateCard = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	try {
		const id = parseInt(req.params.id)
		const updated = await cardService.updateCard(id, req.body)
		res.json(updated)
	} catch (error) {
		res.status(500).json({ message: 'Error updating card', error })
	}
}

export const moveCard = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const id = parseInt(req.params.id)
		const { targetColumnId, newOrder } = req.body

		if (
			isNaN(id) ||
			isNaN(parseInt(targetColumnId)) ||
			isNaN(parseInt(newOrder))
		) {
			return res
				.status(400)
				.json({ message: 'Invalid cardId, columnId or order' })
		}

		const moved = await cardService.moveCard(
			id,
			Number(targetColumnId),
			Number(newOrder)
		)

		res.json(moved)
	} catch (error) {
		console.error('Backend moveCard error:', error)
		res.status(500).json({ message: 'Error moving card', error })
	}
}

export const deleteCard = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	try {
		const id = parseInt(req.params.id)
		await cardService.deleteCard(id)
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: 'Error deleting card', error })
	}
}

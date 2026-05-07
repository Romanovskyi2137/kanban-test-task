import type { Request, Response } from 'express'

import * as cardService from './services/cardService.js'

export const createCard = async (req: Request, res: Response) => {
	const { title, description, columnId } = req.body
	const card = await cardService.createCard(title, description, columnId)
	res.status(201).json(card)
}

export const updateCard = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	const { title, description } = req.body
	const updated = await cardService.updateCard(req.params.id, {
		title,
		description
	})
	res.json(updated)
}

export const moveCard = async (req: Request<{ id: string }>, res: Response) => {
	const { targetColumnId, newOrder } = req.body
	const moved = await cardService.moveCard(
		req.params.id,
		targetColumnId,
		newOrder
	)
	res.json(moved)
}

export const deleteCard = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	await cardService.deleteCard(req.params.id)
	res.status(204).send()
}

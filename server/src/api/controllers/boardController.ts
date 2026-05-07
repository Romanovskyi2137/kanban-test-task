import type { Request, Response } from 'express'

import * as boardService from './services/boardService.js'

export const getBoards = async (_req: Request, res: Response) => {
	const boards = await boardService.getAllBoards()
	res.json(boards)
}

export const getBoard = async (req: Request<{ id: string }>, res: Response) => {
	const board = await boardService.getBoardById(req.params.id)
	res.json(board)
}

export const createBoard = async (req: Request, res: Response) => {
	const { name } = req.body
	const newBoard = await boardService.createBoard(name)
	res.status(201).json(newBoard)
}

export const updateBoard = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	const { name } = req.body
	const updatedBoard = await boardService.updateBoard(req.params.id, name)
	res.json(updatedBoard)
}

export const deleteBoard = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	await boardService.deleteBoard(req.params.id)
	res.status(204).send()
}

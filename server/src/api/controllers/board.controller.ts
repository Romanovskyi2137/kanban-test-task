import type { Request, Response } from 'express'

import * as boardService from '@/src/api/controllers/serviсes/board.service'

export const getBoards = async (req: Request, res: Response) => {
	try {
		const boards = await boardService.getAllBoards()
		res.json(boards)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching boards', error })
	}
}

export const getBoard = async (req: Request<{ id: string }>, res: Response) => {
	try {
		const board = await boardService.getBoardById(req.params.id)
		if (!board) {
			return res.status(404).json({ message: 'Board not found' })
		}
		res.json(board)
	} catch (error) {
		res.status(500).json({ message: 'Error fetching board', error })
	}
}

export const createBoard = async (req: Request, res: Response) => {
	try {
		const { name } = req.body
		if (!name) {
			return res.status(400).json({ message: 'Name is required' })
		}
		const newBoard = await boardService.createBoard(name)
		res.status(201).json(newBoard)
	} catch (error) {
		res.status(500).json({ message: 'Error creating board', error })
	}
}

export const updateBoard = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	try {
		const { name } = req.body
		const updatedBoard = await boardService.updateBoard(req.params.id, name)
		res.json(updatedBoard)
	} catch (error) {
		res.status(500).json({ message: 'Error updating board', error })
	}
}

export const deleteBoard = async (
	req: Request<{ id: string }>,
	res: Response
) => {
	try {
		await boardService.deleteBoard(req.params.id)
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: 'Error deleting board', error })
	}
}

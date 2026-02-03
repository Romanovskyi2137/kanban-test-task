export interface Card {
	id: number
	title: string
	description: string | null
	order: number
	columnId: number
	createdAt: string
}

export interface Column {
	id: number
	title: string
	boardId: string
	cards: Card[]
}

export interface Board {
	id: string
	name: string
	columns: Column[]
	createdAt: string
}

// Types for creating new entities
export type CreateBoardDto = Pick<Board, 'name'>
export type CreateColumnDto = Pick<Column, 'title' | 'boardId'>
export type CreateCardDto = Pick<Card, 'title' | 'description' | 'columnId'>

import { Router } from 'express'

import * as boardController from '../controllers/boardController.js'

const router = Router()

router.get('/', boardController.getBoards)
router.get('/:id', boardController.getBoard)
router.post('/', boardController.createBoard)
router.patch('/:id', boardController.updateBoard)
router.delete('/:id', boardController.deleteBoard)

export default router

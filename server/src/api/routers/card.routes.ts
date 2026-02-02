import { Router } from 'express'

import * as cardController from '../controllers/card.controller'

const router = Router()

router.post('/', cardController.createCard)
router.patch('/:id', cardController.updateCard)
router.patch('/:id/move', cardController.moveCard)
router.delete('/:id', cardController.deleteCard)

export default router

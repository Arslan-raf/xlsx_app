const Router = require('express')
const router = new Router()

const guestController = require('../controllers/guestController')

router.post('/', guestController.create)
router.get('/', guestController.getAll)
router.get('/:id', guestController.getOne)

module.exports = router
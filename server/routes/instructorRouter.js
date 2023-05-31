const Router = require('express')
const router = Router()

const instructorController = require('../controllers/instructorController')

router.post('/', instructorController.create)
router.get('/', instructorController.getAll)
router.get('/:id', instructorController.getOne)

module.exports = router
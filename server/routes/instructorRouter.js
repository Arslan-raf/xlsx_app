const Router = require('express')
const router = Router()

const instructorController = require('../controllers/instructorController')
// const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',  instructorController.create) //checkRole('ADMIN'),
router.get('/', instructorController.getAll)
router.get('/:id', instructorController.getOne)
router.delete('/:id', instructorController.delete)
router.put('/:id', instructorController.update)

module.exports = router
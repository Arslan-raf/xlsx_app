const Router = require('express')
const router = new Router()

const userController = require('../controllers/userController')

router.post('/', userController.registration)
// router.post('/')
router.get('/', userController.getAll)

module.exports = router
const Router = require('express')
const router = new Router()

const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check) // 2 параметр middleware

router.get('/', userController.getAll)

module.exports = router
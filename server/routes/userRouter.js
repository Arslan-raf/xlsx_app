// import { checkAuth } from '../middleware/authMiddleware'
const checkAuth = require('../middleware/authMiddleware')
const Router = require('express')
const router = new Router()



const userController = require('../controllers/userController')
// const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', checkAuth, userController.check) // 2 параметр middleware

router.get('/', userController.getAll)

module.exports = router
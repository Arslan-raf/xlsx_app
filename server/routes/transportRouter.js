const Router = require('express')
const router = new Router()


const transportController = require('../controllers/transportController')

router.post('/', transportController.create)
router.get('/', transportController.getAll)

module.exports = router
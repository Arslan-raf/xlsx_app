const Router = require('express')
const router = Router()

const eventControler = require('../controllers/eventControler')

router.post('/', eventControler.create)
router.get('/', eventControler.getAll)
router.get('/:id', eventControler.getOne)

module.exports = router
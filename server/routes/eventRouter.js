const Router = require('express')
const router = Router()

const eventControler = require('../controllers/eventControler')

router.post('/', eventControler.create)
router.get('/', eventControler.getAll)
router.get('/:id', eventControler.getOne)

router.delete('/:id', eventControler.delete)
router.put('/:id', eventControler.update)

module.exports = router
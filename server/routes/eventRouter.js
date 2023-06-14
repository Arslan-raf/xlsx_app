const Router = require('express')
const router = Router()

const eventControler = require('../controllers/eventControler')

router.post('/', eventControler.create)

router.delete('/:id', eventControler.delete)
router.put('/:id', eventControler.update)

router.get('/:offset&:limit', eventControler.getEventsWithPagination)
router.get('/getAllEvents', eventControler.getAll)
router.get('/getEvent/:id', eventControler.getOne)

// router.get('/:skip&limit', eventControler.getEventsWithPagination)

// ?key2=value2&key1=value1
//  http://lh:3000/api/event?skip=0&take=15
//  ?_limit=${limit}&_page=${page}
module.exports = router
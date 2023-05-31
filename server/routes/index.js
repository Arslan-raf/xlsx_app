const Router = require('express')
const router = new Router()

const transportRouter = require('./transportRouter')
const userRouter = require('./userRouter')
const eventRouter = require('./eventRouter')
const guestRouter = require('./guestRouter')
const instructorRouter = require('./instructorRouter')

router.use('/user', userRouter)
router.use('/guest', guestRouter)
router.use('/instructor', instructorRouter)

router.use('/transport', transportRouter)
router.use('/event', eventRouter)

module.exports = router
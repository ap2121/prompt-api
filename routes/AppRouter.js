const router = require('express').Router()
const AuthRouter = require('./AuthRouter')
const UserRouter = require('./UserRouter')

router.use('/auth', AuthRouter)
router.use('/user', UserRouter)


module.exports = router
const router = require('express').Router()
const AuthRouter = require('./AuthRouter')

router.use('/auth', AuthRouter)



module.exports = router
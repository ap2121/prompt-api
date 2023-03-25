const router = require('express').Router()
const AuthRouter = require('./AuthRouter')
const UserRouter = require('./UserRouter')
const PostRouter = require('./PostRouter')
router.use('/auth', AuthRouter)
router.use('/user', UserRouter)
router.use('/post', PostRouter)
module.exports = router
const router = require('express').Router()
const controller1 = require('../controllers/PostController')
const controller2 = require('../controllers/CommentController')


router.post('/comments/:user_id/:post_id', controller1.NewComment)
router.get('/comments')
router.get('/comments/:post_id', controller2.CommentsByPost)

module.exports = router
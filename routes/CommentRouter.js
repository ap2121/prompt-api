const router = require('express').Router()
const controller1 = require('../controllers/PostController')
const controller2 = require('../controllers/CommentController')

router.get('/comments', controller2.allComments)
router.post('/comments/:user_id/:post_id', controller1.NewComment)
router.get('/comments/:user_id', controller2.CommentsByUser)
router.get('/post-comments/:post_id', controller2.CommentsByPost)
router.delete('/comments/:comment_id', controller2.deleteComment)

module.exports = router
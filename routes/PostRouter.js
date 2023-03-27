const router = require('express').Router()
const controller = require('../controllers/PostController')

router.post('/create-post/:id', controller.NewPost)
router.get('/posts', controller.GetPosts)
router.get('/posts/:id', controller.GetPost)
router.delete('/posts/:post_id', controller.deletePost)

module.exports = router
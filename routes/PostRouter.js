const router = require('express').Router()
const controller = require('../controllers/PostController')

router.post('/create-post/:id', controller.NewPost)
router.get('/posts', controller.GetPosts)

module.exports = router
const router = require('express').Router()
const controller = require('../controllers/PostController')

router.post('/create-post/:id', controller.NewPost)


module.exports = router
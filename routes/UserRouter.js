const router = require('express').Router()
const controller = require('../controllers/UserController')

router.get('/users', controller.getUsers)
router.get('/users/:id', controller.findUserById)
router.get('/followers/:user_id', controller.getUserFollowers)
router.get('/following/:user_id', controller.getUserFollowing)
router.post('/follow/:user_id/:followed_id', controller.followUser)
router.post('/unfollow/:user_id/:unfollowed_id', controller.unfollowUser)
module.exports = router
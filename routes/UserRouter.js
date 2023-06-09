const router = require('express').Router()
const controller = require('../controllers/UserController')
const controller2 = require('../controllers/PostController')
router.get('/users', controller.getUsers)
router.get('/users/:id', controller.findUserById)
router.get('/followers/:user_id', controller.getUserFollowers)
router.get('/following/:user_id', controller.getUserFollowing)
router.get('/feed/:user_id', controller.getUserFeed)
router.post('/follow/:user_id/:followed_id', controller.followUser)
router.post('/unfollow/:user_id/:unfollowed_id', controller.unfollowUser)
router.put('/update-pic/:user_id', controller2.updateProPic)
router.put('/update-bio/:user_id', controller2.updateBio)
router.get('/follow-check/:user_id/:followed_id', controller.isFollowing)
module.exports = router



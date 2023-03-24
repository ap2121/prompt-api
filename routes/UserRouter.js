const router = require('express').Router()
const controller = require('../controllers/UserController')

router.get('/users', controller.getUsers)
router.get('/users/:id', controller.findUserById)

module.exports = router
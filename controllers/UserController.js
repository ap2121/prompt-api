const {User, Post, Comment} = require('../models')

const findUserById = async (req, res) => {
    try {
        let userId = req.params.id
        const user = await User.findByPk(userId, {
            include: [{model: Post}, {model: Comment}]
        })
        res.send(user)
    } catch(error) {
        throw error
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({})
        res.send(users)
    } catch(error) {
        throw error
    }
}

module.exports = {
    findUserById,
    getUsers
}
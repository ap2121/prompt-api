const {User, Post, Comment, UserFollowers, sequelize } = require('../models')
const user = require('../models/user')

const findUserById = async (req, res) => {
    try {
        let userId = req.params.id
        const user = await User.findByPk(userId, {
            include: [{model: Post}, {model: Comment}, {model: User, as: 'Followers'}, {model: User, as: 'Following'}]
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

const followUser = async (req, res) => {
    const userId = parseInt(req.params.user_id)
    const followedId = parseInt(req.params.followed_id)

   const user = await User.findOne({
    where: {id: userId}
   }) 
   const followed = await User.findOne({
    where: {id: followedId}
   })

   await followed.addFollower(user)

   res.send('ok')
   

    

   
}

const unfollowUser = async (req, res) => {
    const userId = parseInt(req.params.user_id)
    const unfollowedId = parseInt(req.params.unfollowed_id)

    const user = await User.findOne({
        where: {id: userId}
    })
    const unfollowed = await User.findOne({
        where: {id: unfollowedId}
    })

    await unfollowed.removeFollower(user)
    res.send('ok')
}

module.exports = {
    findUserById,
    getUsers,
    followUser,
    unfollowUser

    
}
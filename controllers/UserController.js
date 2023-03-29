const {User, Post, Comment, sequelize } = require('../models')


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
    try {
        const userId = parseInt(req.body.id)
        const followedId = parseInt(req.params.followed_id)
    
        const user = await User.findByPk(userId) 
        const followed = await User.findByPk(followedId)
        const userFollowing = await user.getFollowing()
        if(!userFollowing.includes(followed)) {
            await followed.addFollower(user)
            res.send({msg: `user with id ${userId} followed user with id ${followedId}`})
        } else {
            res.send({msg: 'Cannot follow someone twice'})
        }
        
    
       
    } catch(error) {
        throw error
    }
   }

const unfollowUser = async (req, res) => {
    try {
        const userId = parseInt(req.body.id)
        const unfollowedId = parseInt(req.params.unfollowed_id)

        const user = await User.findByPk(userId)
        const unfollowed = await User.findByPk(unfollowedId)

        await unfollowed.removeFollower(user)
    res.send({msg: `user with id ${userId} unfollowed user with id ${unfollowedId}`})
    } catch(error) {
        throw error
    }
}

const getUserFollowers = async (req, res) => {
    const userId = parseInt(req.params.user_id)
    const user = await User.findOne({
        where: {id: userId},
        include: [{model: User, as: 'Followers'}]
    })
   
    res.send(user)
}

const getUserFollowing = async (req, res) => {
    const userId = parseInt(req.params.user_id)
    const user = await User.findOne({
        where: {id: userId},
        include: [{model:User, as: 'Following'}]
    })
    res.send(user)
}

const getUserFeed = async (req, res) => {
    try {
        const userId = parseInt(req.params.user_id)
        const user = await User.findByPk(userId)
        const followed = await user.getFollowing()
        const userFeed = await Post.findAll({
        where: {
            userId: followed.map(u => u.id)
        },
        include: [{model: User}, {model: Comment}]
    })
    res.send(userFeed)
    } catch(error) {
        throw error
    }

}

module.exports = {
    findUserById,
    getUsers,
    followUser,
    unfollowUser,
    getUserFollowers,
    getUserFollowing,
    getUserFeed

    
}
const {Comment, User, Post} = require('../models')

const CommentsByPost = async (req, res) => {
   try {
    const id = parseInt(req.params.post_id)
    const comments = await Comment.findAll({
        where: {postId: id},
        include: [{model: Post}, {model:User}]
    })
    res.status(200).send(comments)
   } catch(error) {
    throw error
   }
}

const CommentsByUser = async (req, res) => {
    const id = parseInt(req.params.user_id)
    const comments = await Comment.findAll({
        where: {userId: id},
        include: [{model: Post}, {model: User}]
    })
    res.status(200).send(comments)
}

module.exports = {
    CommentsByPost,
    CommentsByUser
}
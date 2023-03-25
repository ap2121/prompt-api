const {Comment, User, Post} = require('../models')

const CommentsByPost = async (req, res) => {
   try {
    const id = parseInt(req.params.post_id)
    const comments = await Comment.findAll({
        where: {postId: id}
    })
    res.status(200).send(comments)
   } catch(error) {
    throw error
   }
}

module.exports = {
    CommentsByPost
}
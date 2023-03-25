require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const {Post, Comment, User, sequelize} = require('../models')
const cloudinary = require('cloudinary').v2

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY
const OPEN_AI_ORG_KEY = process.env.OPEN_AI_ORG_KEY
const configuration = new Configuration({
    apiKey: OPEN_AI_API_KEY,
    organization: OPEN_AI_ORG_KEY
    
})
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const openAi = new OpenAIApi(configuration)
const NewPost = async (req, res) => {
    try {
        const {capPrompt, imgPrompt} = req.body
        const userId = parseInt(req.params.id)
        const aiImgRes = await openAi.createImage({
            prompt: `Draw a picture of ${imgPrompt}`,
            n: 1,
            size: '512x512',
            response_format: 'url'
        })
        const aiCapRes = await openAi.createCompletion({
            model: "text-davinci-003",
            prompt: `Write a very short instagram type caption about ${capPrompt}`,
            temperature: 0.5,
            max_tokens: 150
})
        const photo = aiImgRes.data.data[0].url
        const caption = aiCapRes.data.choices[0].text
        const newUrl = await cloudinary.uploader.upload(photo)
        let body = {
            userId,
            imgRes: newUrl.secure_url,
            capRes: caption,
            ...req.body
        }
        
        let post = await Post.create(body)
        res.status(201).send(post)
    } catch(error) {
        res.status(400).send({err: error, msg: 'Hmm chatgpt seemed not to like that'})
    }
}
//NewComment controller in post controllers, due to OpenAI API config taking place in this file

const NewComment = async (req, res) => {
    try {
        const userId = parseInt(req.params.user_id)
        const postId = parseInt(req.params.post_id)
        const {comPrompt} = req.body
        const aiComRes = await openAi.createCompletion({
        model: 'text-davinci-003',
        prompt: `Write a short instagram type comment about ${comPrompt}`,
        temperature: 0.4,
        max_tokens: 150
    })
    const comment = aiComRes.data.choices[0].text

    let body = {
        userId,
        postId,
        comRes: comment,
        comPrompt
        

    }
    let result = await Comment.create(body)
    res.status(201).send(result)

    } catch(error) {
       throw error
    }

}

const GetPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{model: Comment}]
        })
        res.status(200).send(posts)
    } catch(error) {
        res.status(400).send({err: error, msg: 'Something went wrong'})
    }

}

const GetPost = async (req, res) => {
    try {
        let postId = parseInt(req.params.id)
        const post = await Post.findByPk(postId, {
            include: [{model:User}, {model:Comment}]
        })
         res.status(200).send(post)
    } catch(error) {
        res.status(400).send({ msg: 'Something has gone wrong'})
    }
}

module.exports = {
    NewPost,
    GetPosts,
    GetPost,
    NewComment
}
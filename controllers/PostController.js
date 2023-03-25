require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const {Post, sequelize} = require('../models')
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
            prompt: imgPrompt,
            n: 1,
            size: '1024x1024',
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
        throw error
    }
}

module.exports = {
    NewPost
}
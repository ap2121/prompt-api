require('dotenv').config()
const { Configuration, OpenAIApi } = require('openai')
const {Post, sequelize} = require('../models')

const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY
const OPEN_AI_ORG_KEY = process.env.OPEN_AI_ORG_KEY
const configuration = new Configuration({
    apiKey: OPEN_AI_API_KEY,
    organization: OPEN_AI_ORG_KEY
    
})

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
            temperature: 0.5


        })
        

        const photo = aiImgRes.data.data[0].url
        const caption = aiCapRes.data.choices[0].text
        
        const body = {
            userId,
            capRes: caption,
            imgRes: photo,
            ...req.body
        }
        let post = await Post.create(body)
        res.json(post)


        

    } catch(error) {
        throw error
    }
}

module.exports = {
    NewPost
}
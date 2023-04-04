const {User} = require('../models')
const middleware = require('../middleware')

const Login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
                
            },
            raw: true
        })
        let matched = await middleware.comparePassword(
            user.password,
            req.body.password
        )
        if(matched) {
            let payload = {
                id: user.id,
                email: user.email,
                username: user.username
                
            }
            let token = middleware.createToken(payload)
            return res.send({user: payload, token})
        }
        res.status(401).send({status: 'Error', msg: 'Unauthorized'})
    } catch(error) {
        throw error
    }
}


const Register = async (req, res) => {
    try {
        const {email, username} = req.body
        let notHashedPass = req.body.password
        let password = await middleware.hashPassword(notHashedPass)
        const user = await User.create({email, password, username})
        res.send(user)

    } catch(error) {
        throw error
    }
}

const CheckSession = async (req, res) => {
    try {
        const {payload} = res.locals
        res.send(payload)
    } catch(error) {
        throw error
    }
}

module.exports = {
    Login,
    Register,
    CheckSession
}
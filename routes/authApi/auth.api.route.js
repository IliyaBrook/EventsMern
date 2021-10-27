const {Router} = require('express')
const User = require('../../models/User')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = router.post('/authApi', async (req, res) => {
    try {
        const {email, name} = req.body
        const findUser = await User.findOne({ email: email })
        const token = await jwt.sign
        (
            {email, name }
            , config.get('jwtSecret'),
            {expiresIn: '24h'}
        )
        if (!findUser) {
            return res.status(200).json({
                userData: { email, name, role:'user' }
            })
        }
        const { role } = findUser
        return res.status(200).json({
            userData: { email, name, token, role }
        })
    } catch (errors) {
        console.log(errors)
        return res.status(400).json({error: errors})
    }
})
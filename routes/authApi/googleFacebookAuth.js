const {Router} = require('express')
const User = require('../../models/User')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = router.post('/authApi', async (req, res) => {
    try {
        const userEmail = req.body.email

        const {email, name, role } = await User.findOne({email: userEmail})

        const token = await jwt.sign
        (
            {email, name }
            , config.get('jwtSecret'),
            {expiresIn: '24h'}
        )

        return res.status(200).json({
            userData: { email, name, token, role }
        })
    } catch (errors) {
        return res.status(400).json({error: errors})
    }
})
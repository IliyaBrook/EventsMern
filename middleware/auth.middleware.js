const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		return next()
	}
	try {
		const token = req.headers.authorization.split(' ')[1]
		if (!token) {
			return res.status(401).json({message: 'not authorized'})
		}
		req.user = jwt.verify(token, config.get('jwtSecret'))
		next()
	} catch {
		return res.status(401).json({message: 'not authorization'})
	}
}
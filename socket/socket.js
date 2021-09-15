const jwt = require('jsonwebtoken')
const config = require('config')
const Events = require('../models/Event')
const Online = require('../models/Online')


module.exports = (io) => {
	io.use((socket, next) => {
		const token = socket.handshake.auth.token
		const decodedToken = jwt.verify(token, config.get('jwtSecret'))
		if (decodedToken) {
			next()
		}
		next(new Error("Not authorized"))
	})
	
	io.on('connection', socket => {
		const token = socket.handshake.auth.token
		const {name, email} = jwt.verify(token, config.get('jwtSecret'))
		console.log(`user name: ${name}, user email: ${email}`)
		
		socket.emit('testMessage', 'message')
		
		socket.emit('socketId', socket.id)
		socket.on('userConnected', async data => {
			socket.broadcast.emit('broadcastUserConnected', data)
			socket.join('room1')
			const allUsersSet = await io.in('room1').allSockets()
			const allUsersArray = [...new Array(...allUsersSet)]
			console.log(allUsersArray)
			io.to('room1').emit('allConnected', allUsersArray)
		})
		
		
		Events.watch().on('change', async data => {
			switch (data.operationType) {
				case 'insert':
					return io.emit('getEvents', {...data.fullDocument})
				case 'update':
					const eventId = data.documentKey._id
					const event = await Events.findOne({_id: eventId})
					return io.emit('updateEvents', event)
				case 'delete':
					return io.emit('deleteEvents', data.documentKey._id)
			}
		})
		
		// Online.watch().on('change' ,async (data) => {
		// 	// await console.log(data.documentKey._id)
		// 	switch (data.operationType) {
		// 		case 'insert' || 'update':
		// 			return socket.broadcast.emit('onlineStatus', {connected:{name,email, id:data.documentKey._id}})
		// 		case 'delete':
		// 			const disconnectedUser = await Online.findOne({_id:data.documentKey._id})
		// 			return socket.broadcast.emit('onlineStatus', {disconnected:{name,email,_id:data.documentKey._id}})
		//
		// 			// if (updateOnlineUsers !== null ) {
		// 			// 	return socket.broadcast.emit('onlineStatus',
		// 			// 		{connected:{name:updateOnlineUsers.name, email:updateOnlineUsers.email}}
		// 			// 	)
		// 			// }
		// 	}
		// })
		
		// socket.on('disconnect', async (elem) => {
		// 	console.log('user disconnected')
		// 	return socket.broadcast.emit('onlineStatus', {disconnected: [...onlineUser]})
		// })
	})
}


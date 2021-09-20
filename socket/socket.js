const jwt = require('jsonwebtoken')
const config = require('config')
const Events = require('../models/Event')
const Online = require('../models/Online')

module.exports = io => {
	io.use((socket, next) => {
		const token = socket.handshake.auth.token
		const decodedToken = jwt.verify(token, config.get('jwtSecret'))
		if (decodedToken) {
			next()
		}
		next(new Error("Not authorized"))
	})
	
	
	io.on('connection', async socket => {
		
		const allSockets = await io.fetchSockets()
		
		
		// const socketsSingleId = await io.in(theSocketId).fetchSockets()
		// console.log(socketsSingleId)
		
		// for (const socket of sockets) {
		//   console.log(socket.id);
		//   console.log(socket.handshake);
		//   console.log(socket.rooms);
		//   console.log(socket.data);
		//   socket.emit(/* ... */);
		//   socket.join(/* ... */);
		//   socket.leave(/* ... */);
		//   socket.disconnect(/* ... */);
		// }
		
		
		const token = socket.handshake.auth.token
		const {name, email} = jwt.verify(token, config.get('jwtSecret'))
		console.log(`user name: ${name}, user email: ${email}`)
		const mongoDbCursor = Events.watch()
		
		mongoDbCursor.on('change', async data => {
			switch (data.operationType) {
				case 'insert':
					return socket.emit('eventCreated', {...data.fullDocument})
				case 'update':
					const eventId = data.documentKey._id
					const event = await Events.findOne({_id: eventId})
					return socket.emit('eventUpdated', event)
				case 'delete':
					return socket.emit('eventDeleted', data.documentKey._id)
			}
		})
		socket.on("disconnecting", () => {
			console.log('user disconnected')
			console.log(socket.rooms); // the Set contains at least the socket ID
			Events.watch().close()
		})
		
		
		// socket.emit('socketId', socket.id)
		// socket.on('userConnected', async data => {
		// 	socket.broadcast.emit('broadcastUserConnected', data)
		// 	socket.join('room1')
		// 	const allUsersSet = await io.in('room1').allSockets()
		// 	const allUsersArray = [...new Array(...allUsersSet)]
		// 	console.log(allUsersArray)
		// 	io.to('room1').emit('allConnected', allUsersArray)
		// })
		
		
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


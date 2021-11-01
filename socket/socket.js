const Events = require('../models/Event')

module.exports = io => {
	io.on('connection', async socket => {
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
			Events.watch().close()
		})
	})
}


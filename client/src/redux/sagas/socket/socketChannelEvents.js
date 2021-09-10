import {END, eventChannel} from "redux-saga";

export function socketChannelEvents(socket) {
	socket.on('disconnect', () => {
		socket.connect()
		console.log('socket disconnected: ')
	})
	
	return eventChannel(emitter => {
		socket.on('getEvents', allEvents => emitter(allEvents))
		socket.on('updateEvents', newEvent => emitter(newEvent))
		socket.on('deleteEvents', deletedEvent => emitter(deletedEvent))
		return () => emitter(END)
	})
}
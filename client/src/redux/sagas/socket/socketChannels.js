import {eventChannel} from "redux-saga"

export function newEventChannel(socket) {
	const subscribe = emitter => {
		socket.on('eventCreated', emitter);
		return () => socket.removeListener('eventCreated', emitter);
	}
	return eventChannel(subscribe)
}

export function eventUpdatedChannel(socket) {
	const subscribe = emitter => {
		socket.on('eventUpdated', emitter);
		return () => socket.removeListener('eventUpdated', emitter);
	}
	return eventChannel(subscribe)
}

export function eventDeletedChannel(socket) {
	const subscribe = emitter => {
		socket.on('eventDeleted', emitter);
		return () => socket.removeListener('eventDeleted', emitter);
	}
	return eventChannel(subscribe)
}
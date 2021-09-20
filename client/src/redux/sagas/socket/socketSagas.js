import {call, put, take} from "redux-saga/effects"
import {SOCKET_ADD_EVENT, SOCKET_DELETE_EVENT, SOCKET_UPDATE_EVENT} from "../../social/socialTypes"
import {eventDeletedChannel, eventUpdatedChannel, newEventChannel} from "./socketChannels"

export function* newEventSaga(socket) {
	const channel = yield call(newEventChannel, socket)
	while (true) {
		try {
			const payload = yield take(channel)
			yield put({type: SOCKET_ADD_EVENT, eventCreated: payload})
		} catch (errors) {
			console.error('socket error: ', errors)
			channel.close()
		}
	}
}

export function* eventUpdatedSaga(socket) {
	const channel = yield call(eventUpdatedChannel, socket)
	while (true) {
		try {
			const payload = yield take(channel)
			console.log({...payload})
			yield put({type: SOCKET_UPDATE_EVENT, eventUpdated: payload})
		} catch (errors) {
			console.error('socket error: ', errors)
			channel.close()
		}
	}
}


export function* eventDeletedSaga(socket) {
	const channel = yield call(eventDeletedChannel, socket)
	while (true) {
		try {
			const payload = yield take(channel)
			yield put({type: SOCKET_DELETE_EVENT, eventDeleted: payload})
		} catch (errors) {
			console.error('socket error: ', errors)
			channel.close()
		}
	}
}
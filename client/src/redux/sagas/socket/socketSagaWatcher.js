import {call, delay, put, take} from "redux-saga/effects"
import {io} from "socket.io-client"
import {socketChannel} from './socketChannel'
import {SOCKET_ADD_EVENT, SOCKET_DELETE_EVENT, SOCKET_UPDATE_EVENT} from "../../social/socialTypes"
import {SET_SOCKET_CONNECTED_AND_ID} from "../../login/loginTypes"


// export function* socketSagaWatcher(token) {
// 	yield call(socketSaga, token)
// }

export function* socketSaga(token) {
	const socket = yield io({auth: {token}, reconnectionAttempts: 5})
	const channel = yield call(socketChannel, socket)
	
	
	while (socket.id === undefined) {
		yield delay(50)
	}
	yield put({
		type: SET_SOCKET_CONNECTED_AND_ID, payload: {
			isSocketConnected: socket.connected, socketId: socket.id
		}
	})
	
	while (true) {
		try {
			const payload = yield take(channel)
			yield put({type: SOCKET_ADD_EVENT, payload: payload})
			yield put({type: SOCKET_UPDATE_EVENT, payload: payload})
			yield put({type: SOCKET_DELETE_EVENT, payload: payload})
			// yield put({type:SET_SOCKET_CONNECTED_AND_ID, payload: payload})
		} catch (errors) {
			console.error('socket error: ', errors)
			channel.close()
		}
	}
}
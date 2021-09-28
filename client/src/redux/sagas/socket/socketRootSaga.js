import {all, delay, fork, put, select} from "redux-saga/effects"
import {io} from "socket.io-client"
import {SET_SOCKET_CONNECTED_AND_ID} from "../../login/loginTypes"
import {eventDeletedSaga, eventUpdatedSaga, newEventSaga} from "./socketSagas"


export function* socketRootSaga(token) {
	const isAuth = yield select(state => state.loginReducer.isAuth)
	if (isAuth) {
		const socket = io({auth: {token}, reconnectionDelay: 8000})
		yield all(
			[
				fork(newEventSaga, socket),
				fork(eventUpdatedSaga, socket),
				fork(eventDeletedSaga, socket)
			]
		)
		while (socket.connected === false) {
			yield delay(5000)
			yield put({
				type: SET_SOCKET_CONNECTED_AND_ID, payload: {
					isSocketConnected: socket.connected, socketId: socket.id
				}
			})
			if (socket.connected === false) {
				console.error('socket disconnected, server unavailable, trying again....')
			}
		}
	}
}




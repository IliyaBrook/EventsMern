import {call, put, select, take} from "redux-saga/effects";
import {io} from "socket.io-client";
import {socketChannel} from "./socketChannel";
import {SOCKET_ADD_EVENT, SOCKET_DELETE_EVENT, SOCKET_UPDATE_EVENT} from "../../social/socialTypes";

export function* socketChannelSaga() {
	const {token} = yield select(state => state.loginReducer)
	const socket = io({auth: {token}, reconnectionAttempts: 5})
	
	const socketChannel = yield call(socketChannel, socket)
	
	while (true) {
		try {
			const payload = yield take(socketChannel)
			yield put({type: SOCKET_ADD_EVENT, payload: payload})
			yield put({type: SOCKET_UPDATE_EVENT, payload: payload})
			yield put({type: SOCKET_DELETE_EVENT, payload: payload})
		} catch (errors) {
			console.error('socket error: ', errors)
			socketChannel.close()
		}
	}
}
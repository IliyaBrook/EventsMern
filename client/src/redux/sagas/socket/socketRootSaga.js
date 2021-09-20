import {all, fork, put} from "redux-saga/effects"
import {io} from "socket.io-client"
import {SET_SOCKET_CONNECTED_AND_ID} from "../../login/loginTypes"
import {eventDeletedSaga, eventUpdatedSaga, newEventSaga} from "./socketSagas"

const token = JSON.parse(localStorage.getItem('userData'))?.token
// const socket = io({
// 	auth: {token},
// 	reconnection: false,
// 	cors:{
// 		origin: 'http:localhost:5000',
// 		credentials:true
// 	},
// 	transports: ['websocket']
// })
const socket = io({
	auth: {token},
	reconnection: false
})

export function* socketRootSaga() {
	yield all(
		[
			fork(newEventSaga, socket),
			fork(eventUpdatedSaga, socket),
			fork(eventDeletedSaga, socket)
		]
	)
	
	yield put({
		type: SET_SOCKET_CONNECTED_AND_ID, payload: {
			isSocketConnected: socket.connected, socketId: socket.id
		}
	})
}




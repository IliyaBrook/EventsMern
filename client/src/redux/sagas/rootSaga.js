import {all, call} from 'redux-saga/effects'
import {registrationSaga} from "./registration/registrationSaga";
import {loginSaga} from "./login/loginSaga"

export function* rootSaga() {
	yield all([
		// call(socketChannelSaga),
		call(registrationSaga), call(loginSaga)
	])
}




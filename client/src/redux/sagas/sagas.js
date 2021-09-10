import {all, call} from 'redux-saga/effects'
import {socketChannelSaga} from './socket/socketSaga'
import {registrationSagaWatcher} from "./registration/registrationSaga";

export function* rootSaga() {
	yield all([ call(socketChannelSaga), call(registrationSagaWatcher)])
}




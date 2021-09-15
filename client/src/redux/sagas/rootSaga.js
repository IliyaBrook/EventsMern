import {all, fork} from 'redux-saga/effects'
import {registrationSagaWatcher} from "./registration/registrationSagaWatcher";
import {loginSagaWatcher} from "./login/loginSagaWatcher"
import {refreshSagaWorker} from "./refreshData/refreshSagaWorker"
import {profilePageModalWatcher} from "./profilePageModal/profilePageModalWatcher"


export function* rootSaga() {
	yield all([
		fork(refreshSagaWorker),
		fork(loginSagaWatcher),
		fork(registrationSagaWatcher),
		fork(profilePageModalWatcher),
	])
}




import {all, fork} from 'redux-saga/effects'
import {registrationSagaWatcher} from "./registration/registrationSagaWatcher";
import {loginSagaWatcher} from "./login/loginSagaWatcher"
import {refreshSaga} from "./refreshData/refreshSaga"
import {profilePageModalWatcher} from "./profilePageModal/profilePageModalWatcher"
import {homePageWatcher} from "./homePageSaga/homePageWatcher"


export function* rootSaga() {
	yield all([
		fork(refreshSaga),
		fork(loginSagaWatcher),
		fork(registrationSagaWatcher),
		fork(profilePageModalWatcher),
		fork(homePageWatcher),
	])
}




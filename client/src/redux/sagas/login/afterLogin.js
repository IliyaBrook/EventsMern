import {call, put, take} from "redux-saga/effects";
import {SET_LOGIN_DATA} from "../../login/loginTypes";
import {refreshActionEvents} from "../../events/eventsAction";

export function* afterLoginSaga() {
	yield call(watchUserLoggedIn)
}

function* watchUserLoggedIn() {
	yield take(SET_LOGIN_DATA)
	yield call(workerUserLoggedIn)
}

function* workerUserLoggedIn() {
	yield put(refreshActionEvents())
}


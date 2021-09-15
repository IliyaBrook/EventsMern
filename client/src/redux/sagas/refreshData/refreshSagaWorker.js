import {call, fork, join, put, select} from "redux-saga/effects"
import {SET_LOGIN_DATA} from "../../login/loginTypes"
import useRequest from "../../../hooks/useRequest"
import {logoutAction} from "../../login/loginActions"
import {windowSizeAction} from "../../tools/windowSizeReducer"
import {REFRESH_EVENTS} from "../../events/eventsTypes"

import {HOME_PAGE_LOADING_FALSE} from "../../homePage/homePageReducerTypes"


export function* refreshSagaWorker() {
	// yield takeEvery(REFRESH_DATA, refreshAction)
	// yield fork(refreshAction)
	// yield takeEvery('USER_SUCCESSFUL_LOGIN', refreshAction)
}

export function* refreshAction() {
	yield fork(windowResizeRefreshWorker)
	const refreshTask = yield fork(refreshUserDataFromStorageWorker)
	yield fork(refreshPullFromStorageRoot)
	const token = yield join(refreshTask)
	if (token) {
		yield fork(socketSagaWatcher, token)
	}
}

function* refreshPullFromStorageRoot() {
	yield call(refreshUserDataFromStorageWorker)
	yield call(refreshPullEvents)
}

function* refreshUserDataFromStorageWorker() {
	// yield put({type:HOME_PAGE_LOADING_TRUE})
	const localStorageData = yield JSON.parse(localStorage.getItem('userData'))
	if (localStorageData) {
		const response = yield call(validateCurrentData, localStorageData.token)
		if (response.message === 'not authorized') {
			return yield put(logoutAction())
		}
		yield put({type: SET_LOGIN_DATA, payload: {...response, isAuth: true, token: localStorageData.token}})
		yield put({type:HOME_PAGE_LOADING_FALSE})
		return localStorageData.token
	}
	yield put({type:HOME_PAGE_LOADING_FALSE})
}

function* refreshPullEvents() {
	const token = yield select(state => state.loginReducer.token)
	if (token) {
		const events = yield call(pullEventOnRefresh, token)
		yield put({type: REFRESH_EVENTS, payload: [...events]})
	}
}

async function validateCurrentData(localStorageToken) {
	return await useRequest('/refresh', 'GET', null, localStorageToken)
}

function* windowResizeRefreshWorker() {
	yield put(windowSizeAction())
}

async function pullEventOnRefresh(token) {
	return await useRequest('/refreshEvents', 'GET', null, token)
}
import {call, fork, put} from "redux-saga/effects"
import {SET_LOGIN_DATA} from "../../login/loginTypes"
import {logoutAction} from "../../login/loginActions"
import {windowSizeAction} from "../../tools/windowSizeReducer"
import {REFRESH_EVENTS} from "../../events/eventsTypes"
import {HOME_PAGE_LOADING_FALSE, HOME_PAGE_LOADING_TRUE} from "../../homePage/homePageReducerTypes"
import {useRequestSaga} from "../use/useRequestSaga"
import {socketRootSaga} from "../socket/socketRootSaga"


export function* refreshSaga() {
	yield put(windowSizeAction())
	yield call(requestDataWorker)
}

function* requestDataWorker() {
	const localStorageData = yield JSON.parse(localStorage.getItem('userData'))
	if (localStorageData) {
		yield put({type:HOME_PAGE_LOADING_TRUE})
		const {data} = yield call(useRequestSaga, {url: '/refresh', token: localStorageData.token})
		if (!data.isAuth) {
			yield put({type: HOME_PAGE_LOADING_FALSE})
			return yield put(logoutAction())
		}
		yield put({type: SET_LOGIN_DATA, payload: {...data, token: localStorageData.token}})
		yield call(getEvents, localStorageData.token)
		yield fork(socketRootSaga, localStorageData.token)
		yield put({type: HOME_PAGE_LOADING_FALSE})
	}
	yield put({type: HOME_PAGE_LOADING_FALSE})
}

function* getEvents(token) {
	const {data} = yield call(useRequestSaga, {url: '/refreshEvents', token: token})
	yield put({type: REFRESH_EVENTS, payload: [...data]})
}
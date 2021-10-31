import {call, fork, put} from "redux-saga/effects"
import {SET_LOGIN_DATA} from "../../login/loginTypes"
import {REFRESH_EVENTS} from "../../events/eventsTypes"
import {HOME_PAGE_LOADING_FALSE, HOME_PAGE_LOADING_TRUE} from "../../homePage/homePageReducerTypes"
import {useRequestSaga} from "../use/useRequestSaga"
import {socketRootSaga} from "../socket/socketRootSaga"


export function* refreshSaga() {
	yield call(requestDataWorker)
}

function* requestDataWorker() {
	yield fork(getEvents)
	const localStorageData = yield JSON.parse(localStorage.getItem('userData'))
	if (localStorageData) {
		yield put({type:HOME_PAGE_LOADING_TRUE})
		const {data} = yield call(useRequestSaga, {url: '/refresh', token: localStorageData.token})
		if (!data.isAuth) {
			yield put({type: HOME_PAGE_LOADING_FALSE})
		}
		yield put({type: SET_LOGIN_DATA, payload: {...data, token: localStorageData.token}})
		yield fork(socketRootSaga, localStorageData.token)
		yield put({type: HOME_PAGE_LOADING_FALSE})
	}
	yield put({type:SET_LOGIN_DATA,payload:{role:'guest'}})
	yield put({type: HOME_PAGE_LOADING_FALSE})
}

function* getEvents() {
	const {data} = yield call(useRequestSaga, {url: '/refreshEvents'})
	yield put({type: REFRESH_EVENTS, payload: [...data]})
}

// function* guestFirstVisit() {
// 	const authorized = yield localStorage.getItem('userData')
// 	if (!authorized) {
// 		yield put({type:SET_LOGIN_DATA,payload:{role:'guest'}})
// 	}
// }

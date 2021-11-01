import {call, fork, put} from "redux-saga/effects"
import {SET_LOGIN_DATA} from "../../login/loginTypes"
import {REFRESH_EVENTS} from "../../events/eventsTypes"
import {useRequestSaga} from "../use/useRequestSaga"
import {socketRootSaga} from "../socket/socketRootSaga"


export function* refreshSaga() {
    yield call(requestDataWorker)
}

function* requestDataWorker() {
    yield fork(getEvents)
    const localStorageData = yield JSON.parse(localStorage.getItem('userData'))
    if (localStorageData) {
        const {data} = yield call(useRequestSaga, {url: '/refresh', token: localStorageData.token})
        yield put({type: SET_LOGIN_DATA, payload: {...data, token: localStorageData.token}})
        yield fork(socketRootSaga, localStorageData.token)
    }else {
        yield put({type: SET_LOGIN_DATA, payload: {role: 'guest'}})
    }
}

function* getEvents() {
    const {data} = yield call(useRequestSaga, {url: '/refreshEvents'})
    yield put({type: REFRESH_EVENTS, payload: [...data]})
}
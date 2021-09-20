import {call, fork, put, select, takeEvery} from "redux-saga/effects"
import {LOGIN_FORM_VALID, LOGIN_LOADING_FALSE, LOGIN_LOADING_TRUE, SET_LOGIN_DATA} from "../../login/loginTypes"
import {push} from "react-router-redux"
import {socketRootSaga} from "../socket/socketRootSaga"
import {useRequestSaga} from "../use/useRequestSaga"


export function* loginSagaWatcher() {
	yield takeEvery(LOGIN_FORM_VALID, loginSagaWorker)
}

function* loginSagaWorker() {
	try {
		yield put({type:LOGIN_LOADING_TRUE})
		const {email, password} = yield select(state => state.loginReducer.inputs)
		const {...res} = yield call(useRequestSaga,{url:'/login', method:'POST', body:{email, password}})
		if (!res?.request.ok) {
			yield put({type: LOGIN_LOADING_FALSE})
			if (res.data) {
				const errors = Object.values(res.data)
				return errors.forEach(error => window.M.toast({html: error}))
			}
			return yield window.M.toast({html: res.request.statusText})
		}
		localStorage.setItem('userData', JSON.stringify({...res.data}))
		yield put({type: SET_LOGIN_DATA, payload: {...res.data, isAuth: true}})
		yield window.M.toast({html: `Welcome! ${Object.values(res.data)[1]}`})
		yield fork(socketRootSaga, res.data.token)
		yield put(push('/'))
		yield put({type: LOGIN_LOADING_FALSE})
	} catch (e) {
		console.log(e)
		return yield window.M.toast({html: 'Server is temporarily unavailable'})
	}
}
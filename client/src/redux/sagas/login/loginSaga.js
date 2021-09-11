import {call, delay, put, select, takeEvery} from "redux-saga/effects"
import {CLEAR_LOGIN_ERRORS, CLEAR_LOGIN_STATE, REQUEST_LOGIN, SET_LOGIN_DATA} from "../../login/loginTypes"
import {loginAction} from "../../login/loginActions"
import {push} from 'react-router-redux'

export function* loginSaga() {
	yield call(loginSagaWatcher)
}

export function* loginSagaWatcher() {
	yield takeEvery(REQUEST_LOGIN, loginSagaWorker)
	yield takeEvery(REQUEST_LOGIN, loginSagaWorkerResetErrors)
}

function* loginSagaWorker() {
	const {emailError, passwordError} = yield select(state => state.loginReducer.loginErrors)
	if (emailError === 'valid' && passwordError === 'valid') {
		const res = yield put(loginAction())
		console.log('response: ', res)
		const data = yield res
		console.log('data response: ', data)
		if (Object.keys(data)[0] === 'loginErrors') {
			yield  window.M.toast({html: Object.values(data)[0]})
			return yield put({type:CLEAR_LOGIN_STATE})
		}
		
		yield yield  window.M.toast({html: `Welcome! ${Object.values(data)[1]}`})
		yield put({type:SET_LOGIN_DATA, payload: {...data,isAuth:true }})
		yield put(push('/'))
	}
}


function* loginSagaWorkerResetErrors() {
	yield delay(5000)
	yield put({type: CLEAR_LOGIN_ERRORS})
}

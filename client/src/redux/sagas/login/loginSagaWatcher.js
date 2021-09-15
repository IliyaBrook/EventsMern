import {call, fork, put, select, takeEvery} from "redux-saga/effects"
import {LOGIN_FORM_VALID, LOGIN_LOADING_FALSE, LOGIN_LOADING_TRUE, SET_LOGIN_DATA} from "../../login/loginTypes"
import {push} from "react-router-redux"
import {socketSaga} from "../socket/socketSagaWatcher"


export function* loginSagaWatcher() {
	yield takeEvery(LOGIN_FORM_VALID, loginSagaWorker)
}

function* loginSagaWorker() {
	try {
		yield put({type:LOGIN_LOADING_TRUE})
		const {email, password} = yield select(state => state.loginReducer.inputs)
		
		const request = yield call(fetch, '/login', {
			method: 'POST', body: JSON.stringify({email, password}),
			headers: {'Content-Type': 'application/json'}
		})
		const data = yield call([request, request.json])
		if (!request.ok) {
			yield put({type:LOGIN_LOADING_FALSE})
			const error = Object.values(data)[0]
			return yield window.M.toast({html: error})
		}
		yield put({type:SET_LOGIN_DATA, payload: {...data,isAuth:true }})
		yield window.M.toast({html: `Welcome! ${Object.values(data)[1]}`})
		yield fork(socketSaga, data.token)
		yield put(push('/'))
		yield put({type:LOGIN_LOADING_FALSE})
	} catch (e) {
		yield put({type:LOGIN_LOADING_FALSE})
		yield yield window.M.toast({html: JSON.stringify(e)})
	}
}
import {call, put, select, takeEvery} from 'redux-saga/effects'
import {
	CLEAR_REGISTRATION_ERRORS,
	REGISTRATION_FORM_VALID,
	REGISTRATION_LOADING_FALSE,
	REGISTRATION_LOADING_TRUE,
} from '../../registration/registrationTypes'
import {push} from "react-router-redux"
import {useRequestSaga} from "../use/useRequestSaga"


export function* registrationSagaWatcher() {
	yield takeEvery(REGISTRATION_FORM_VALID, SagaWorkerFetchRegistrationData)
}

function* SagaWorkerFetchRegistrationData() {
	try {
		yield put({type: REGISTRATION_LOADING_TRUE})
		const {email, name, password} = yield select(state => state.registrationReducer.inputs)
		const res = yield call(useRequestSaga,{url:'/registration', method:'POST', body:{email, name, password}})
		if (!res.request.ok) {
			yield put({type: REGISTRATION_LOADING_FALSE})
			return yield window.M.toast({html: res.data.registrationMessage})
		}
		yield window.M.toast({html: `Welcome, ${name}! ; Thank you, now please authorize!`})
		yield put({type:CLEAR_REGISTRATION_ERRORS})
		yield put(push('/login'))
		yield put({type: REGISTRATION_LOADING_FALSE})
	} catch (e) {
		console.log(e)
		return yield window.M.toast({html: 'Server is temporarily unavailable'})
	}
}

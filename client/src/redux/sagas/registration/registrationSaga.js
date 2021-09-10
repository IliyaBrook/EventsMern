import {call, delay, put, select, takeEvery} from 'redux-saga/effects'
import useRequest from "../../../hooks/useRequest";
import {
	CLEAR_INPUT_CONTROLS,
	CLEAR_REGISTRATION_ERRORS,
	REGISTRATION_LOADING_FALSE,
	REGISTRATION_LOADING_TRUE,
	REQUEST_REGISTRATION
} from '../../registration/registrationTypes'
import {push} from 'react-router-redux'

export function* registrationSagaWatcher() {
	yield takeEvery(REQUEST_REGISTRATION, registrationSagaWorkerResetErrors)
	yield takeEvery(REQUEST_REGISTRATION, SagaWorkerFetchRegistrationData)
}

function* registrationSagaWorkerResetErrors() {
	yield delay(5000)
	yield put({type: CLEAR_REGISTRATION_ERRORS})
}


function* SagaWorkerFetchRegistrationData() {
	try {
		const {email, name, password} = yield select(state => state.registrationReducer.inputs)
		const {emailErrorVal, passwordErrorVal, nameErrorVal} = yield select(state => state.registrationReducer.errors)
		if (emailErrorVal === 'valid' && passwordErrorVal === 'valid' && nameErrorVal === 'valid') {
			yield put({type: REGISTRATION_LOADING_TRUE})
			const payload = yield call(fetchRegistration, {email, name, password})
			yield window.M.toast({html: Object.values(payload)[0]})
			if (payload?.registrationMessage === "user has been created") {
				yield put(push('/login'))
			}
			yield put({type:CLEAR_INPUT_CONTROLS})
		}
		yield put({type: REGISTRATION_LOADING_FALSE})
	} catch (errors) {
		console.log(errors)
		yield put({type: REGISTRATION_LOADING_FALSE})
	}
}

async function fetchRegistration({...body}) {
	return await useRequest('/register', 'POST', {...body})
}
import {call, fork, put, select, takeEvery} from 'redux-saga/effects'
import useRequest from "../../../hooks/useRequest"
import {REGISTRATION_FORM_VALID, REGISTRATION_LOADING_FALSE,} from '../../registration/registrationTypes'
import {socketSaga} from "../socket/socketSagaWatcher"
import {push} from "react-router-redux"


export function* registrationSagaWatcher() {
	yield takeEvery(REGISTRATION_FORM_VALID, SagaWorkerFetchRegistrationData)
}


function* SagaWorkerFetchRegistrationData() {
	try {
		const {email, name, password} = yield select(state => state.registrationReducer.inputs)
		const request = yield call(fetch, '/registration', {
			method: 'POST', body: JSON.stringify({email, name, password}),
			headers: {'Content-Type': 'application/json'}
		})
		const data = yield call([request, request.json])
		if (!request.ok) {
			yield put({type: REGISTRATION_LOADING_FALSE})
			const error = Object.values(data)[0]
			return yield window.M.toast({html: error})
		}
		yield window.M.toast({html: 'Thank you!, '})
		yield fork(socketSaga, data.token)
		yield put(push('/'))
		
		
		// if (emailErrorVal === 'valid' && passwordErrorVal === 'valid' && nameErrorVal === 'valid') {
		// 	const payload = yield call(fetchRegistration, {email, name, password})
		// 	yield window.M.toast({html: Object.values(payload)[0]})
		// 	if (payload?.registrationMessage === "user has been created") {
		// 		yield put(push('/login'))
		// 	}
		// }
		
		
		yield put({type: REGISTRATION_LOADING_FALSE})
	} catch (errors) {
		yield put({type: REGISTRATION_LOADING_FALSE})
		yield yield window.M.toast({html: JSON.stringify(e)})
	}
}

async function fetchRegistration({...body}) {
	return await useRequest('/registration', 'POST', {...body})
}
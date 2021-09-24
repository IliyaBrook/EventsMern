import {call, put, select, takeEvery} from "redux-saga/effects"
import {
	CLICK_RENDER_CREATE_EVENT,
	CLICK_RENDER_EVENTS,
	CLICK_RENDER_HOME_PAGE,
	CLICK_RENDER_USERS,
	PROFILE_PAGE_USERS_LOADING_FALSE,
	PROFILE_PAGE_USERS_LOADING_TRUE,
	RENDER_MODAL_CONTENT,
	SET_ROLE
} from "../../profilePage/admin/userManagment/userManagmentTypes"
import {getUsersAction} from "../../profilePage/admin/userManagment/userManagmentAction"
import {useRequestSaga} from "../use/useRequestSaga"


export function* profilePageModalWatcher() {
	yield takeEvery(CLICK_RENDER_USERS, getUsersWorker)
	yield takeEvery(CLICK_RENDER_EVENTS, getEventsWorker)
	yield takeEvery(CLICK_RENDER_CREATE_EVENT, getCreateEvent)
	yield takeEvery(CLICK_RENDER_HOME_PAGE, getHomePage)
	yield takeEvery(SET_ROLE, setUserRoleWorker)
}

function* getUsersWorker() {
	yield put({type: PROFILE_PAGE_USERS_LOADING_TRUE})
	yield put({type: RENDER_MODAL_CONTENT, payload: 'getUsers'})
	const getUsers = yield put(getUsersAction())
	yield getUsers
	yield put({type: PROFILE_PAGE_USERS_LOADING_FALSE})
}

function* getEventsWorker() {
	yield put({type: RENDER_MODAL_CONTENT, payload: 'getEvents'})
}

function* getCreateEvent() {
	yield put({type: RENDER_MODAL_CONTENT, payload: 'addEvents'})
}

function* getHomePage() {
	yield put({type: RENDER_MODAL_CONTENT, payload: 'profileHome'})
}

function* setUserRoleWorker(event) {
	const token = yield select(state => state.loginReducer.token)
	try {
		yield call(useRequestSaga, {
			url: '/profilePage/setRole', method: 'POST', token, body: {
				email: event.payload.newUser.email,
				role: event.payload.newUser.role
			}
		})
	} catch (errors) {
		yield errors
		console.log(errors)
		return yield window.M.toast({html: JSON.stringify(errors)})
	}
}
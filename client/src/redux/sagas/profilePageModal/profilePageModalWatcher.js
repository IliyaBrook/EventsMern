import {put, takeEvery} from "redux-saga/effects"
import {
	CLICK_RENDER_CREATE_EVENT,
	CLICK_RENDER_EVENTS,
	CLICK_RENDER_USERS,
	PROFILE_PAGE_EVENTS_LOADING_TRUE,
	PROFILE_PAGE_USERS_LOADING_FALSE,
	PROFILE_PAGE_USERS_LOADING_TRUE,
	RENDER_MODAL_CONTENT
} from "../../profilePage/admin/userManagment/userManagmentTypes"
import {getUsersAction} from "../../profilePage/admin/userManagment/userManagmentAction"


export function* profilePageModalWatcher() {
	yield takeEvery(CLICK_RENDER_USERS,getUsersWorker)
	yield takeEvery(CLICK_RENDER_EVENTS,getEventsWorker)
	yield takeEvery(CLICK_RENDER_CREATE_EVENT,getCreateEvent)
}
//'getUsers'
//'usersEvents'
//'addEvents'
function* getUsersWorker() {
	yield put({type:PROFILE_PAGE_USERS_LOADING_TRUE})
	yield put({type:RENDER_MODAL_CONTENT, payload:'getUsers'})
	const getUsers = yield put(getUsersAction())
	yield getUsers
	yield put({type:PROFILE_PAGE_USERS_LOADING_FALSE})
}

function* getEventsWorker() {
	yield put({type:PROFILE_PAGE_EVENTS_LOADING_TRUE})
	yield put({type:RENDER_MODAL_CONTENT, payload:'usersEvents'})
	// const getUsers = yield put(getUsersAction())
	// yield getUsers
	// yield put({type:PROFILE_PAGE_USERS_LOADING_FALSE})
}

function* getCreateEvent() {
	// yield put({type:PROFILE_PAGE_CREATE_EVENT_LOADING_TRUE})
	yield put({type:RENDER_MODAL_CONTENT, payload:'addEvents'})
	// const getUsers = yield put(getUsersAction())
	// yield getUsers
	// yield put({type:PROFILE_PAGE_CREATE_EVENT_LOADING_FALSE})
}
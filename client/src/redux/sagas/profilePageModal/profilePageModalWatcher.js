import {call, put, select, takeEvery} from "redux-saga/effects"
import {
	CLICK_RENDER_CREATE_EVENT,
	CLICK_RENDER_EVENTS,
	CLICK_RENDER_USERS,
	PROFILE_PAGE_USERS_LOADING_FALSE,
	PROFILE_PAGE_USERS_LOADING_TRUE,
	RENDER_MODAL_CONTENT,
	SET_ROLE
} from "../../profilePage/admin/userManagment/userManagmentTypes"
import {getUsersAction} from "../../profilePage/admin/userManagment/userManagmentAction"


export function* profilePageModalWatcher() {
	yield takeEvery(CLICK_RENDER_USERS,getUsersWorker)
	yield takeEvery(CLICK_RENDER_EVENTS,getEventsWorker)
	yield takeEvery(CLICK_RENDER_CREATE_EVENT,getCreateEvent)
	yield takeEvery(SET_ROLE,setUserRoleWorker)
}

function* getUsersWorker() {
	yield put({type:PROFILE_PAGE_USERS_LOADING_TRUE})
	yield put({type:RENDER_MODAL_CONTENT, payload:'getUsers'})
	const getUsers = yield put(getUsersAction())
	yield getUsers
	yield put({type:PROFILE_PAGE_USERS_LOADING_FALSE})
}

function* getEventsWorker() {
	yield put({type:RENDER_MODAL_CONTENT, payload:'getEvents'})
}

function* getCreateEvent() {
	yield put({type:RENDER_MODAL_CONTENT, payload:'addEvents'})
}

// const response = useRequest('/profilePage/setAdmin', 'POST', {email:user.email, role:user.role} , token)
		// await response
		// console.log('response:',response)


function* setUserRoleWorker(event) {
	const token = select(state => state.loginReducer.token)
	const response = yield call(fetch,'/profilePage/setAdmin')
	console.log(event)
	const eventUser = yield event
	console.log(eventUser)
}
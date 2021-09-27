import {HOME_PAGE_LETS_START} from "../../homePage/homePageReducerTypes"
import {takeEvery} from "redux-saga/effects"

export function* homePageWatcher() {
	yield takeEvery(HOME_PAGE_LETS_START, homePageSagaWorker)
}

function* homePageSagaWorker() {
	const sideNav = document.querySelector('.sidenav')
	const instance = M.Sidenav.getInstance(sideNav)
	instance.open()
}
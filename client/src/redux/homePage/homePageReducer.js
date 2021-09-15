import {HOME_PAGE_LOADING_FALSE, HOME_PAGE_LOADING_TRUE} from "./homePageReducerTypes";

const homePageReducerInitState = {
	loading: false,
}
export const homePageReducer = (state = homePageReducerInitState, action) => {
	switch (action.type) {
		case HOME_PAGE_LOADING_TRUE:
			return {loading: true}
		case HOME_PAGE_LOADING_FALSE:
			return {loading: false}
		default:
			return state
	}
}


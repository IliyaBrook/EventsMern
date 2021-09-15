import {WINDOW_WIDTH} from "./toolsTypes";

const windowSizeReducerInit = {
	width:document.body.clientWidth
}

export const windowSizeReducer = (state = windowSizeReducerInit, action) => {
	switch (action.type) {
		case WINDOW_WIDTH:
			return {...state, width: action.payload}
		default:
			return state
	}
}
export const windowSizeAction = () => {
	return dispatch => {
		return window.addEventListener('resize', (resizeEvent) => {
			return dispatch({type:WINDOW_WIDTH, payload: resizeEvent.target.innerWidth})
		})
	}
}
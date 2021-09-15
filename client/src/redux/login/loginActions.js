import {LOG_OUT} from "./loginTypes"

export const logoutAction = () => {
	localStorage.removeItem('userData')
	return dispatch => dispatch({type: LOG_OUT})
}
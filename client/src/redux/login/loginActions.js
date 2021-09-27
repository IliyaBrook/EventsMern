import {LOG_OUT} from "./loginTypes"
import {push} from "react-router-redux"

export const logoutAction = () => {
	return dispatch => {
		localStorage.removeItem('userData')
		dispatch({type: LOG_OUT})
		return dispatch(push('/'))
	}
}
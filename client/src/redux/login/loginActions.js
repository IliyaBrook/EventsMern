import {LOG_OUT, SET_LOGIN_DATA} from "./loginTypes"
import useRequest from "../../hooks/useRequest"

export const loginAction = () => {
	return async (dispatch, getState) => {
		const {email, password} = getState().loginReducer.loginInputsControls
		return await useRequest('/login', 'POST', {email, password})
	}
}

export const logoutAction = () => {
	localStorage.removeItem('userData')
	return dispatch => dispatch({type: LOG_OUT, payload: false})
}
export const refreshUserAction = () => {
	return async (dispatch) => {
		const storage = JSON.parse(localStorage.getItem('userData'))
		if (storage?.token) {
			dispatch({type: SET_LOGIN_DATA, payload: {...storage}})
		}
		const data = await useRequest('/refresh', 'GET', null, storage?.token)
		await data
		if (data.message === "not authorization") {
			return dispatch(logoutAction())
		}
		dispatch({type: SET_LOGIN_DATA, payload: {...data}})
	}
}
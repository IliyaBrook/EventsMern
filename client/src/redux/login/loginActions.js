import {LOG_OUT, SET_LOGIN_DATA} from "./loginTypes"
import useRequest from "../../hooks/useRequest"

// export const loginAction = () => {
// 	return async (dispatch, getState) => {
// 		const {inputEmail, inputPassword} = getState().loginReducer
// 		const {emailError, passwordError} = getState().loginReducer.loginErrors
// 		if (!emailError && !passwordError) {
// 			try {
// 				const data = await useRequest('/login', 'POST', {email: inputEmail, password: inputPassword})
// 				const isToken = !!data?.token
// 				const emailClassName = data.emailError ? 'invalid' : null
// 				const passwordClassName = data.passwordError ? 'invalid' : null
// 				data.token && localStorage.setItem('userData', JSON.stringify(data))
// 				dispatch({
// 					type: SET_LOGIN_DATA, payload: {
// 						...data, isAuth: isToken,
// 						emailClassName,
// 						passwordClassName
// 					}
// 				})
// 				if (data.loginErrors) {
// 					return window.M.toast({html: data.loginErrors})
// 				} else {
// 					dispatch(refreshActionEvents())
// 					window.M.toast({html: `Welcome! ${data.name}`})
// 					dispatch(push('/'))
// 				}
// 				isToken && dispatch({type: SET_LOGIN_DATA, payload: {loginErrors: null}})
// 			} catch (error) {
// 				window.M.toast({html: 'Server error contact our support =('})
// 				dispatch({type: SET_LOGIN_ERRORS, payload: {loginErrors: error}})
// 			}
// 		}
// 	}
// }



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
import {
	ADD_SOCKET_ID,
	CLEAR_ERRORS_EMAIL,
	CLEAR_ERRORS_PASSWORD,
	CLEAR_LOGIN_INPUTS,
	CLEAR_LOGIN_STATE,
	LOG_OUT,
	LOGIN_LOADING_FALSE,
	LOGIN_LOADING_TRUE,
	SET_LOGIN_DATA,
	SET_LOGIN_ERRORS,
	SET_SOCKET_CONNECTED_AND_ID,
	UPDATE_LOGIN_INPUTS
} from "./loginTypes"

export const initialStateLogin = {
	isSocketConnected: false,
	socketId: null,
	email: null,
	name: null,
	token: null,
	isAuth: false,
	role: null,
	loginErrors: {
		emailError: null,
		emailClassName: null,
		passwordError: null,
		passwordClassName: null,
	}
	, inputs: {
		email: '',
		password: ''
	},
	loading: false
}
export const loginReducer = (state = initialStateLogin, action) => {
	switch (action.type) {
		case ADD_SOCKET_ID:
			return {...state, socketId: action.payload}
		case SET_LOGIN_DATA:
			return {
				...state,
				email: action.payload.email, name: action.payload.name,
				role: action.payload.role, token: action.payload.token,
				isAuth: action.payload.isAuth
			}
		case LOG_OUT:
			return {...initialStateLogin}
		case SET_LOGIN_ERRORS:
			return {...state, loginErrors: {...state.loginErrors, ...action.payload}}
		case UPDATE_LOGIN_INPUTS:
			return {...state, inputs: {...action.payload}}
		case CLEAR_LOGIN_STATE:
			return {...initialStateLogin}
		case CLEAR_ERRORS_EMAIL:
			return {
				...state, loginErrors: {
					...state.loginErrors,
					emailError: null,
					emailClassName: null,
				}
			}
		case CLEAR_ERRORS_PASSWORD:
			return {
				...state, loginErrors: {
					...state.loginErrors,
					passwordError: null,
					passwordClassName: null,
				}
			}
		case CLEAR_LOGIN_INPUTS:
			return {
				...state, inputs: {
					email: '',
					password: ''
				}
			}
		case SET_SOCKET_CONNECTED_AND_ID:
			console.log(action.payload)
			return {...state, ...action.payload}
		
		case LOGIN_LOADING_TRUE:
			return {...state, loading: true}
		case LOGIN_LOADING_FALSE:
			return {...state, loading: false}
		default:
			return state
	}
}




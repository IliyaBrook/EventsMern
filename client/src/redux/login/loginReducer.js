import {
	ADD_SOCKET_ID,
	CLEAR_LOGIN_ERRORS,
	CLEAR_LOGIN_STATE,
	LOG_OUT,
	LOGIN_DATA_LOADING_FALSE,
	LOGIN_DATA_LOADING_TRUE,
	SET_LOGIN_DATA,
	SET_LOGIN_ERRORS,
	UPDATE_LOGIN_INPUT_CONTROLS_EMAIL,
	UPDATE_LOGIN_INPUT_CONTROLS_PASSWORD
} from "./loginTypes";

export const initialStateLogin = {
	email: null,
	name: null,
	token: null,
	isAuth: false,
	role: null,
	socketId:'',
	loginErrors:{
		emailError: null,
		emailClassName: null,
		passwordError: null,
		passwordClassName: null,
	},
	isLoading:false
	,loginInputsControls:{
		email:'',
		password:''
	}
}
export const loginReducer = (state = initialStateLogin, action) => {
	switch (action.type) {
		case ADD_SOCKET_ID:
			return {...state, socketId: action.payload}
		case SET_LOGIN_DATA:
			return {...initialStateLogin,
				email: action.payload.email, name:action.payload.name,
				role: action.payload.role, token: action.payload.token,
				isAuth: action.payload.isAuth
			}
		case LOG_OUT:
			return {...state, ...initialStateLogin, isAuth: action.payload}
		case SET_LOGIN_ERRORS:
			return {...state, loginErrors: {...state.loginErrors, ...action.payload}}
		case CLEAR_LOGIN_ERRORS	:
			return {...state, loginErrors: {...initialStateLogin.loginErrors}}
		case UPDATE_LOGIN_INPUT_CONTROLS_EMAIL:
			return {...state, loginInputsControls: {...state.loginInputsControls, email: action.payload}}
		case UPDATE_LOGIN_INPUT_CONTROLS_PASSWORD:
			return {...state, loginInputsControls: {...state.loginInputsControls, password: action.payload }}
		case CLEAR_LOGIN_STATE:
			return {...initialStateLogin}
		case LOGIN_DATA_LOADING_TRUE:
			return {...state, isLoading: true}
		case LOGIN_DATA_LOADING_FALSE:
			return {...state, isLoading: false}
		default:
			return state
	}
}




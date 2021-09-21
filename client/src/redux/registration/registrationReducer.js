import {
	CLEAR_ERRORS_EMAIL,
	CLEAR_ERRORS_NAME,
	CLEAR_ERRORS_PASSWORD,
	CLEAR_INPUT_CONTROLS,
	CLEAR_REGISTRATION_ERRORS,
	REGISTRATION_LOADING_FALSE,
	REGISTRATION_LOADING_TRUE,
	SET_REG_ERRORS,
	UPDATE_REGISTRATION_INPUTS
} from "./registrationTypes"

export const registrationInitialState = {
	errors: {
		emailErrorVal: null,
		emailClassName: null,
		passwordErrorVal: null,
		passwordClassName: null,
		nameErrorVal: null,
		nameClassName: null,
	},
	inputs: {
		email: '',
		password: '',
		name: ''
	},
	registrationMessage: null,
	loading: false
}

export const registrationReducer = (state = registrationInitialState, action) => {
	switch (action.type) {
		case SET_REG_ERRORS:
			return {...state, errors: {...state.errors, ...action.payload}}
		case UPDATE_REGISTRATION_INPUTS:
			return {...state, inputs: {...action.payload}}
		case CLEAR_INPUT_CONTROLS:
			return {...state, inputs: {...registrationInitialState.inputControls}}
		case REGISTRATION_LOADING_TRUE:
			return {...state, loading: true}
		case REGISTRATION_LOADING_FALSE:
			return {...state, loading: false}
		
		
		case CLEAR_ERRORS_EMAIL:
			return {
				...state, errors: {
					...state.loginErrors,
					emailErrorVal: null,
					emailClassName: null,
				}
			}
		case CLEAR_ERRORS_PASSWORD:
			return {
				...state, errors: {
					...state.errors,
					passwordErrorVal: null,
					passwordClassName: null,
				}
			}
		case CLEAR_ERRORS_NAME:
			return {
				...state, errors: {
					...state.errors,
					nameErrorVal: null,
					nameClassName: null,
				}
			}
		
		case CLEAR_REGISTRATION_ERRORS:
			return {...state, errors: {...registrationInitialState.errors}}
		default:
			return state
	}
}

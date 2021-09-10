import {
	CLEAR_INPUT_CONTROLS,
	CLEAR_REGISTRATION_ERRORS,
	REGISTRATION_LOADING_FALSE,
	REGISTRATION_LOADING_TRUE,
	SET_INPUT_CONTROLS,
	SET_REG_ERRORS,
	SET_REGISTRATION_INPUTS_EMAIL,
	SET_REGISTRATION_INPUTS_NAME,
	SET_REGISTRATION_INPUTS_PASSWORD,
} from "./registrationTypes";

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
	inputControls: {
		email: '',
		password: '',
		name: ''
	},
	registrationMessage: null,
	isLoading: false
}

export const registrationReducer = (state = registrationInitialState, action) => {
	switch (action.type) {
		case SET_REG_ERRORS:
			return {...state, errors: {...state.errors, ...action.payload}}
		case SET_REGISTRATION_INPUTS_EMAIL:
			return {...state, inputs: {...state.inputs, email: action.payload.email}}
		case SET_REGISTRATION_INPUTS_PASSWORD:
			return {...state, inputs: {...state.inputs, password: action.payload.password}}
		case SET_REGISTRATION_INPUTS_NAME:
			return {...state, inputs: {...state.inputs, name: action.payload.name}}
		case REGISTRATION_LOADING_TRUE:
			return {...state, isLoading: true}
		case REGISTRATION_LOADING_FALSE:
			return {...state, isLoading: false}
		case SET_INPUT_CONTROLS:
			return {...state, inputControls: {...state.inputControls, ...action.payload}}
		case CLEAR_INPUT_CONTROLS:
			return {...state, inputControls: {...registrationInitialState.inputControls}}
		case CLEAR_REGISTRATION_ERRORS:
			return {...state, errors: {...registrationInitialState.errors}}
		default:
			return state
	}
}

import validator from "validator/es";
import {
	CLEAR_ERRORS_EMAIL,
	CLEAR_ERRORS_NAME,
	CLEAR_ERRORS_PASSWORD,
	REGISTRATION_FORM_VALID,
	REQUEST_REGISTRATION,
	SET_REG_ERRORS,
	UPDATE_REGISTRATION_INPUTS
} from "../registration/registrationTypes"

export const registrationFormMiddleware = ({dispatch, getState}) => {
	return next => {
		return action => {
			if (action.type === REQUEST_REGISTRATION) {
				const {email, password, name} = getState().registrationReducer.inputs
				const validateInputs = () => {
					const emailErrorVal = validator.isEmail(email) ? 'correct' : 'Incorrect email address'
					const emailClassName = validator.isEmail(email) ? 'correct' : 'invalid'
					const passwordErrorVal = validator.isLength(password, {min: 5}) ? 'correct' : 'Password minimum length is 5'
					const passwordClassName = validator.isLength(password, {min: 5}) ? 'correct' : 'invalid'
					const nameErrorVal = validator.isLength(name, {min: 1}) ? 'correct' : 'Name cannot be empty'
					const nameClassName = validator.isLength(name, {min: 1}) ? 'correct' : 'invalid'
					return {
						emailErrorVal,
						emailClassName,
						passwordErrorVal,
						passwordClassName,
						nameErrorVal,
						nameClassName
					}
				}
				const checkAllInput = Object.values(validateInputs()).every(elem => elem === 'correct')
				if (checkAllInput) {
					dispatch({type: REGISTRATION_FORM_VALID})
					return next(action)
				}
				return dispatch({type: SET_REG_ERRORS, payload: {...validateInputs()}})
			}
			if (action.type === UPDATE_REGISTRATION_INPUTS) {
				action.payload.email.length === 0 && dispatch({type: CLEAR_ERRORS_EMAIL})
				action.payload.password.length === 0 && dispatch({type: CLEAR_ERRORS_PASSWORD})
				action.payload.name.length === 0 && dispatch({type: CLEAR_ERRORS_NAME})
			}
			return next(action)
		}
	}
}
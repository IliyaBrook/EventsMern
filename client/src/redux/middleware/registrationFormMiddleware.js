import validator from "validator/es";
import {
	CLEAR_REGISTRATION_ERRORS,
	REGISTRATION_FORM_VALID,
	REQUEST_REGISTRATION,
	SET_REG_ERRORS
} from "../registration/registrationTypes";

export const registrationFormMiddleware = ({dispatch, getState}) => {
	return next => {
		return action => {
			if (action.type === REQUEST_REGISTRATION) {
				const {email, password, name} = getState().registrationReducer.inputs
				const validateInputs = () => {
					const emailErrorVal = validator.isEmail(email) ? 'valid' : 'Incorrect email address'
					const emailClassName = validator.isEmail(email) ? 'valid' : 'invalid'
					const passwordErrorVal = validator.isLength(password, {min: 5}) ? 'valid' : 'Password minimum length is 5'
					const passwordClassName = validator.isLength(password, {min: 5}) ? 'valid' : 'invalid'
					const nameErrorVal = validator.isLength(name, {min: 1}) ? 'valid' : 'Name cannot be empty'
					const nameClassName = validator.isLength(name, {min: 1}) ? 'valid' : 'invalid'
					return {emailErrorVal, emailClassName, passwordErrorVal, passwordClassName, nameErrorVal, nameClassName}
				}
				const checkAllInput = Object.values(validateInputs()).every(elem => elem === 'valid')
				if (checkAllInput) {
					dispatch({type:REGISTRATION_FORM_VALID})
					return next(action)
				}
				setTimeout(() => dispatch({type: CLEAR_REGISTRATION_ERRORS}), 3000)
				return dispatch({type: SET_REG_ERRORS, payload: {...validateInputs()}})
			}
			return next(action)
		}
	}
}
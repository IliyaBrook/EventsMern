import validator from "validator/es";
import {
	SET_REG_ERRORS,
	SET_REGISTRATION_INPUTS_EMAIL,
	SET_REGISTRATION_INPUTS_NAME,
	SET_REGISTRATION_INPUTS_PASSWORD
} from "../registration/registrationTypes";

export const showRegistrationAlertMiddleware = ({dispatch}) => {
	return next => {
		return action => {
			if (action.type === SET_REGISTRATION_INPUTS_EMAIL) {
				const {email} = action.payload
				dispatch({
					type: SET_REG_ERRORS, payload: {
						emailErrorVal: validator.isEmail(email) ? 'valid' : 'Incorrect email address',
						emailClassName: validator.isEmail(email) ? 'valid' : 'invalid',
					}
				})
			}
			if (action.type === SET_REGISTRATION_INPUTS_PASSWORD) {
				const {password} = action.payload
				dispatch({
					type: SET_REG_ERRORS, payload: {
						passwordErrorVal: validator.isLength(password, {min: 5}) ? 'valid' : 'Password minimum length is 5',
						passwordClassName: validator.isLength(password, {min: 5}) ? 'valid' : 'invalid',
					}
				})
			}
			if (action.type === SET_REGISTRATION_INPUTS_NAME) {
				const {name} = action.payload
				dispatch({
					type: SET_REG_ERRORS, payload: {
						nameErrorVal: validator.isLength(name, {min: 1}) ? 'valid' : 'Name cannot be empty',
						nameClassName: validator.isLength(name, {min: 1}) ? 'valid' : 'invalid',
					}
				})
			}
			return next(action)
		}
	}
}
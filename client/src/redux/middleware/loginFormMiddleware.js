import {
	CLEAR_ERRORS_EMAIL,
	CLEAR_ERRORS_PASSWORD,
	LOGIN_FORM_VALID,
	REQUEST_LOGIN,
	SET_LOGIN_ERRORS,
	UPDATE_LOGIN_INPUTS
} from "../login/loginTypes"
import validator from 'validator/es'

export const loginFormMiddleware = ({dispatch, getState}) => {
	return (next) => {
		return (action) => {
			if (action.type === REQUEST_LOGIN) {
				const {email, password} = getState().loginReducer.inputs
				const validateInputs = () => {
					const emailError = validator.isEmail(email) ? 'correct' : 'Please enter valid email address'
					const emailClassName = validator.isEmail(email) ? 'correct' : 'invalid'
					const passwordError = validator.isLength(password, {min: 5}) ? 'correct' : 'Please enter your password'
					const passwordClassName = validator.isLength(password, {min: 5}) ? 'correct' : 'invalid'
					return {emailError, emailClassName, passwordError, passwordClassName}
				}
				const checkAllInput = Object.values(validateInputs()).every(elem => elem === 'correct')
				if (checkAllInput) {
					dispatch({type: LOGIN_FORM_VALID})
					return next(action)
				}
				return dispatch({type: SET_LOGIN_ERRORS, payload: {...validateInputs()}})
			}
			if (action.type === UPDATE_LOGIN_INPUTS) {
				action.payload.email.length === 0 && dispatch({type: CLEAR_ERRORS_EMAIL})
				action.payload.password.length === 0 && dispatch({type: CLEAR_ERRORS_PASSWORD})
			}
			return next(action)
		}
	}
}

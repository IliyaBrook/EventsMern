import {CLEAR_LOGIN_ERRORS, LOGIN_FORM_VALID, REQUEST_LOGIN, SET_LOGIN_ERRORS} from "../login/loginTypes"
import validator from 'validator/es'

export const loginFormMiddleware = ({dispatch, getState}) => {
	return (next) => {
		return (action) => {
			if (action.type === REQUEST_LOGIN) {
				const {email, password} = getState().loginReducer.inputs
				const validateInputs = () => {
					const emailError = validator.isEmail(email) ? 'valid' : 'Please enter valid email address'
					const emailClassName = validator.isEmail(email) ? 'valid' : 'invalid'
					const passwordError = validator.isLength(password, {min: 5}) ? 'valid' : 'Please enter your password'
					const passwordClassName = validator.isLength(password, {min: 5}) ? 'valid' : 'invalid'
					return {emailError, emailClassName, passwordError, passwordClassName}
				}
				const checkAllInput = Object.values(validateInputs()).every(elem => elem === 'valid')
				if (checkAllInput) {
					dispatch({type:LOGIN_FORM_VALID})
					return next(action)
				}
				setTimeout(() => dispatch({type: CLEAR_LOGIN_ERRORS}), 3000)
				return dispatch({type: SET_LOGIN_ERRORS, payload: {...validateInputs()}})
			}
			return next(action)
		}
	}
}

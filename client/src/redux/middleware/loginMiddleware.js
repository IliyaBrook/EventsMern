import {REQUEST_LOGIN, SET_LOGIN_ERRORS} from "../login/loginTypes"
import validator from 'validator/es'


export const loginErrorsMiddleware = ({dispatch, getState}) => {
	return (next) => {
		return (action) => {
			const {email, password} = getState().loginReducer.loginInputsControls
			if (action.type === REQUEST_LOGIN) {
				dispatch({
					type: SET_LOGIN_ERRORS, payload: {
						emailError: validator.isEmail(email) ? 'valid' : 'Please enter valid email address',
						emailClassName: validator.isEmail(email) ? 'valid' : 'invalid',
						passwordError: validator.isLength(password, {min: 5}) ? 'valid' : 'Please enter your password',
						passwordClassName: validator.isLength(password, {min: 5}) ? 'valid' : 'invalid'
					}
				})
			}
			return next(action)
		}
	}
}

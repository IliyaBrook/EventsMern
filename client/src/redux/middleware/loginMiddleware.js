import {REQUEST_LOGIN, SET_LOGIN_ERRORS} from "../login/loginTypes"
import validator from 'validator/es'


export const loginErrorsMiddleware = ({dispatch, getState}) => {
	return (next) => {
		return (action) => {
			const {email, password} = getState().loginReducer.loginInputsControls
			if (action.type === REQUEST_LOGIN) {
				dispatch({
					type: SET_LOGIN_ERRORS, payload: {
						emailError: validator.isEmail(email) ? null : 'Please enter your email',
						emailClassName: validator.isEmail(email) ? null : 'invalid',
						passwordError: validator.isLength(password, {min: 5}) ? null : 'Please enter your password',
						passwordClassName: validator.isLength(password, {min: 5}) ? null : 'invalid'
					}
				})
			}
			return next(action)
		}
	}
}

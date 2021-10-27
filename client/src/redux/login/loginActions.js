import {LOG_OUT, SET_LOGIN_DATA} from "./loginTypes"
import {push} from "react-router-redux"

export const logoutAction = () => {
	return dispatch => {
		localStorage.removeItem('userData')
		dispatch({type: LOG_OUT})
		return dispatch(push('/'))
	}
}

export const authApiAction = (props) => {
	return async dispatch => {
		const response = await fetch('/authApi', {
			method:'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(props)
		})
		const data = await response.json()
		try {
			const {email, name, role, token } = data.userData
			localStorage.setItem('userData',JSON.stringify({email, name, role, token}))
			return dispatch({type:SET_LOGIN_DATA, payload:{email, name, role, token, isAuth: true }})
		}catch (error){
			console.log(error)
			window.M.toast({html: 'Server error'})
		}
	}
}
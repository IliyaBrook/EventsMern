import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import useFormHandler from "../../hooks/formHandler.hook"
import {
	REQUEST_LOGIN,
	UPDATE_LOGIN_INPUT_CONTROLS_EMAIL,
	UPDATE_LOGIN_INPUT_CONTROLS_PASSWORD
} from "../../redux/login/loginTypes"
import './loginPage.scss'
import spinner from "../loaders/spinner"


const LoginPage = () => {
	const dispatch = useDispatch()
	const {
		emailError, emailClassName, passwordError, passwordClassName
	} = useSelector(state => state.loginReducer.loginErrors)
	const {isLoading, loginInputsControls: { email:email, password: password }} = useSelector(state => state.loginReducer)
	const {inputHandler, input} = useFormHandler({
		inputEmail: '',
		inputPassword: '',
	})
	useEffect(() => {
		dispatch({type: UPDATE_LOGIN_INPUT_CONTROLS_EMAIL, payload: input.inputEmail})
		dispatch({type: UPDATE_LOGIN_INPUT_CONTROLS_PASSWORD, payload: input.inputPassword})
	}, [input])
	const formSubmit = async (event) => {
		event.preventDefault()
		dispatch({type: REQUEST_LOGIN})
	}
	
	if (isLoading) {
		return spinner
	}
	return (
		<form noValidate onSubmit={formSubmit}>
			<div className="container p-xl-5 mt-5">
				<div className="row">
					<div className="input-field col s6 offset-xl6 pull-xl3">
						<input type="email"
						       className={emailClassName}
						       name="inputEmail"
						       id="email"
						       onChange={inputHandler}
						       autoComplete="email"
						       value={email}
						/>
						<label htmlFor="email">Email</label>
						<span className="helper-text"
						      data-error={emailError}
						      data-success="right"/>
					</div>
				</div>
				
				<div className="row">
					<div className="input-field col s6 offset-xl6 pull-xl3">
						<input type="password"
						       className={passwordClassName}
						       name="inputPassword" autoComplete="no"
						       id="password"
						       onChange={inputHandler}
						       value={password}
						/>
						<label htmlFor="password">Password</label>
						<span className="helper-text"
						      data-error={passwordError}
						      data-success="right"/>
					</div>
				</div>
			</div>
			<div className="w-100 d-flex justify-content-center">
				<button typeof="submit" className="btn">Submit</button>
			</div>
		</form>
	)
	
}

export default LoginPage